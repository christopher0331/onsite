/**
 * Turn a search-box string into a Repliers listings query.
 *
 * Repliers keyword `search` is AND across tokens and does not split an address
 * across fields. Sending the whole line ("11219 210th Avenue Ct E, Bonney Lake,
 * WA 98391") matches nothing: "Avenue"/"Court" may not equal the stored suffix
 * ("Ave"/"Avenue Ct"), "E" lives in streetDirection, and a comma makes
 * "WA 98391" its own required phrase. Street number + street name is the
 * address search Repliers documents (`search` + `searchFields`, or
 * streetNumber/streetName). City, state, and ZIP are sent as their own params
 * when the user actually typed them — never as extra keywords.
 */

export const ADDRESS_SEARCH_FIELDS = "address.streetNumber,address.streetName";

/** Cities that must stay city searches. Includes names that end in a suffix word ("Federal Way"). */
const KNOWN_CITIES = [
  "Lake Tapps",
  "Bonney Lake",
  "Sumner",
  "Edgewood",
  "Milton",
  "Buckley",
  "Puyallup",
  "Graham",
  "Auburn",
  "Orting",
  "Enumclaw",
  "South Prairie",
  "Carbonado",
  "Federal Way",
  "University Place",
  "Maple Valley",
  "Gig Harbor",
  "Tacoma",
  "Seattle",
  "Kent",
  "Renton",
  "Covington",
  "Sammamish",
  "Bellevue",
  "Kirkland",
  "Redmond",
  "Fife",
  "Spanaway",
  "Frederickson",
  "Lacey",
  "Olympia",
  "Yelm",
  "Des Moines",
];

const SUFFIXES = new Set([
  "aly", "alley", "ave", "avenue", "blvd", "boulevard", "bnd", "bend",
  "cir", "circle", "ct", "court", "cv", "cove", "dr", "drive",
  "hwy", "highway", "ln", "lane", "loop", "pkwy", "parkway", "pl", "place",
  "pt", "point", "rd", "road", "row", "run", "sq", "square", "st", "street",
  "ter", "terr", "terrace", "trl", "trail", "way", "path", "pass", "walk",
  "cres", "crescent", "xing", "crossing",
]);

const DIRECTIONS = new Map<string, string>([
  ["n", "N"], ["s", "S"], ["e", "E"], ["w", "W"],
  ["ne", "NE"], ["nw", "NW"], ["se", "SE"], ["sw", "SW"],
  ["north", "N"], ["south", "S"], ["east", "E"], ["west", "W"],
  ["northeast", "NE"], ["northwest", "NW"], ["southeast", "SE"], ["southwest", "SW"],
]);

const STATES = new Map<string, string>([
  ["wa", "WA"], ["or", "OR"], ["ca", "CA"], ["id", "ID"],
  ["washington", "WA"], ["oregon", "OR"], ["california", "CA"], ["idaho", "ID"],
]);

const CITY_BY_KEY = new Map(KNOWN_CITIES.map((city) => [city.toLowerCase(), city]));
const CITY_TOKEN_LIST = [...KNOWN_CITIES]
  .map((city) => ({ city, tokens: city.toLowerCase().split(/\s+/) }))
  .sort((a, b) => b.tokens.length - a.tokens.length);

export type AddressPlan = {
  kind: "address";
  streetNumber: string | null;
  streetName: string;
  /** Tokens safe to send as Repliers `search` (no comma, suffix, direction, city, state, or ZIP). */
  streetSearch: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  direction: string | null;
  suffixes: string[];
};

export type LocationPlan =
  | { kind: "empty" }
  | { kind: "zip"; zip: string }
  | { kind: "place"; text: string; state: string | null; zip: string | null }
  | AddressPlan;

function cleanToken(token: string): string {
  return token.toLowerCase().replace(/\./g, "");
}

function canonicalCity(value: string): string {
  const key = value.trim().toLowerCase().replace(/\s+/g, " ");
  return CITY_BY_KEY.get(key) ?? value.trim().replace(/\s+/g, " ");
}

function isKnownCity(value: string): boolean {
  return CITY_BY_KEY.has(value.trim().toLowerCase().replace(/\s+/g, " "));
}

function isSuffix(token: string): boolean {
  return SUFFIXES.has(token);
}

function isDirection(token: string): boolean {
  return DIRECTIONS.has(token);
}

function isStreetNumber(token: string): boolean {
  return /^\d+[a-z]?(?:-\d+[a-z]?)?$/.test(token);
}

function stripUnit(street: string): string {
  return street
    .replace(/\s+(?:#|apt\.?|apartment|unit|ste\.?|suite)\s*[\w-]+.*$/i, "")
    .replace(/\s+#[\w-]+.*$/i, "")
    .trim();
}

function peelKnownCity(nameTokens: string[]): { name: string[]; city: string | null } {
  for (const candidate of CITY_TOKEN_LIST) {
    const n = candidate.tokens.length;
    if (n >= nameTokens.length) continue;
    const tail = nameTokens.slice(nameTokens.length - n);
    if (tail.every((token, i) => token === candidate.tokens[i])) {
      return { name: nameTokens.slice(0, -n), city: candidate.city };
    }
  }
  return { name: nameTokens, city: null };
}

function parseStreetLine(streetLine: string, cityFromComma: string | null): Omit<
  AddressPlan,
  "kind" | "state" | "zip"
> | null {
  const tokens = stripUnit(streetLine).split(/\s+/).map(cleanToken).filter(Boolean);
  if (!tokens.length) return null;

  let i = 0;
  let streetNumber: string | null = null;
  if (isStreetNumber(tokens[0])) {
    streetNumber = tokens[0];
    i = 1;
    if (tokens[i] && /^\d+\/\d+$/.test(tokens[i])) i += 1;
  }

  if (
    tokens[i] &&
    isDirection(tokens[i]) &&
    tokens.slice(i + 1).some((token) => !isDirection(token) && !isSuffix(token))
  ) {
    i += 1;
  }

  const name: string[] = [];
  while (i < tokens.length && !isSuffix(tokens[i])) {
    name.push(tokens[i]);
    i += 1;
  }
  const suffixes: string[] = [];
  while (i < tokens.length && isSuffix(tokens[i])) {
    suffixes.push(tokens[i]);
    i += 1;
  }
  let direction: string | null = null;
  if (i < tokens.length && isDirection(tokens[i])) {
    direction = DIRECTIONS.get(tokens[i]) ?? null;
    i += 1;
  }

  let city = cityFromComma;
  const leftover = tokens.slice(i);
  if (!city && leftover.length) {
    city = leftover.join(" ");
  } else if (!city && suffixes.length === 0 && !direction) {
    const peeled = peelKnownCity(name);
    if (peeled.city) {
      name.length = 0;
      name.push(...peeled.name);
      city = peeled.city;
    }
  }

  if (!name.length) return null;
  // A bare place name ("Bonney Lake", "Tehaleh") has no house number and no suffix.
  if (!streetNumber && suffixes.length === 0 && !direction) return null;

  const streetName = name.join(" ");
  return {
    streetNumber,
    streetName,
    streetSearch: [streetNumber, streetName].filter(Boolean).join(" "),
    city: city ? canonicalCity(city) : null,
    direction,
    suffixes,
  };
}

export function resolveLocationQuery(raw: string | null | undefined): LocationPlan {
  const trimmed = (raw ?? "").trim().replace(/\s+/g, " ");
  if (trimmed.length < 2) return { kind: "empty" };

  let zip: string | null = null;
  let body = trimmed;
  const trailingZip = body.match(/^(.*\S)[\s,]+(\d{5})(?:-\d{4})?$/);
  if (trailingZip) {
    zip = trailingZip[2];
    body = trailingZip[1].replace(/,\s*$/, "").trim();
  } else if (/^\d{5}$/.test(body)) {
    return { kind: "zip", zip: body };
  }

  let state: string | null = null;
  const trailingState = body.match(/^(.*\S)[\s,]+([A-Za-z.]+)$/);
  if (trailingState) {
    const mapped = STATES.get(cleanToken(trailingState[2]));
    if (mapped) {
      state = mapped;
      body = trailingState[1].replace(/,\s*$/, "").trim();
    }
  }

  if (!body) {
    return zip ? { kind: "zip", zip } : { kind: "empty" };
  }
  if (isKnownCity(body)) {
    return { kind: "place", text: canonicalCity(body), state, zip };
  }

  const [streetPart, ...cityParts] = body.split(",").map((part) => part.trim()).filter(Boolean);
  const cityFromComma = cityParts.length ? cityParts.join(" ") : null;
  const street = parseStreetLine(streetPart, cityFromComma);
  if (street) {
    return { kind: "address", ...street, state, zip };
  }

  return { kind: "place", text: body, state, zip };
}

/**
 * Apply a free-text location (the search box, or `city` / `q`) onto a Repliers
 * query. Plain city names stay a `city` filter. ZIP stays a `zip` filter.
 * Street addresses use street number + street name instead of the raw string.
 */
export function applyFreeTextLocation(
  params: URLSearchParams,
  raw: string | null | undefined
): LocationPlan {
  const plan = resolveLocationQuery(raw);
  if (plan.kind === "empty") return plan;
  if (plan.kind === "zip") {
    params.set("zip", plan.zip);
    return plan;
  }
  if (plan.kind === "place") {
    params.set("city", plan.text);
    if (plan.zip) params.set("zip", plan.zip);
    if (plan.state) params.set("state", plan.state);
    return plan;
  }
  params.set("search", plan.streetSearch);
  params.set("searchFields", ADDRESS_SEARCH_FIELDS);
  if (plan.city) params.set("city", plan.city);
  if (plan.zip) params.set("zip", plan.zip);
  if (plan.state) params.set("state", plan.state);
  return plan;
}

/**
 * Statuses a specific house can be in and still have a public listing page.
 * City browse stays on the caller's for-sale set. Delete and Incomplete are
 * omitted; those records are not public listing pages.
 */
const HOUSE_NUMBER_STATUSES = [
  "Pending",
  "Closed",
  "Coming Soon",
  "Hold",
  "Withdrawn",
  "Expired",
  "Canceled",
] as const;

/** A house-number lookup should still find the listing when it is not Active. */
export function includeAddressHistoryStatuses(params: URLSearchParams) {
  const have = new Set(params.getAll("standardStatus"));
  if (!have.has("Active") && !have.has("Active Under Contract")) return;
  for (const status of HOUSE_NUMBER_STATUSES) {
    if (!have.has(status)) params.append("standardStatus", status);
  }
}

export function isHouseNumberSearch(params: URLSearchParams): boolean {
  return (
    params.get("searchFields") === ADDRESS_SEARCH_FIELDS &&
    /^\d/.test(params.get("search") || "")
  );
}

export type AddressMatchListing = {
  standardStatus?: string | null;
  address?: {
    streetNumber?: string | null;
    streetName?: string | null;
    streetSuffix?: string | null;
    streetDirection?: string | null;
    city?: string | null;
    zip?: string | null;
  } | null;
};

export function streetNumberMatches(field: string | null | undefined, wanted: string): boolean {
  if (!field) return false;
  const want = wanted.trim().toLowerCase();
  const hay = field.trim().toLowerCase();
  if (hay === want) return true;
  const escaped = want.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`).test(hay);
}

export function rankAddressMatch(listing: AddressMatchListing, plan: AddressPlan): number {
  const address = listing.address;
  if (plan.streetNumber && !streetNumberMatches(address?.streetNumber, plan.streetNumber)) {
    return -1;
  }
  if (plan.streetName) {
    const name = address?.streetName?.toLowerCase() ?? "";
    if (!name.includes(plan.streetName.toLowerCase())) return -1;
  }
  let score = 0;
  if (plan.streetNumber) score += 10;
  if (plan.streetName) score += 5;
  if (plan.city && address?.city?.toLowerCase() === plan.city.toLowerCase()) score += 3;
  if (plan.zip && (address?.zip || "").startsWith(plan.zip)) score += 3;
  if (plan.direction) {
    const listingDir = DIRECTIONS.get(cleanToken(address?.streetDirection || "")) ?? null;
    if (listingDir === plan.direction) score += 2;
  }
  if (plan.suffixes.length && address?.streetSuffix) {
    const stored = address.streetSuffix.split(/\s+/).map(cleanToken);
    if (plan.suffixes.every((suffix) => stored.includes(suffix))) score += 2;
  }
  const status = listing.standardStatus || "";
  if (status === "Active" || status === "Active Under Contract") score += 2;
  else if (status === "Pending") score += 1;
  return score;
}
