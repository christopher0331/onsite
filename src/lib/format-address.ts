/** Repliers / RESO address components for the street line. */
export type StreetAddressParts = {
  streetNumber?: string | null;
  streetName?: string | null;
  streetSuffix?: string | null;
  /** Post-directional when `streetDirectionPrefix` is set; see formatter logic. */
  streetDirection?: string | null;
  streetDirectionPrefix?: string | null;
  unitNumber?: string | null;
};

function clean(part: string | null | undefined): string {
  const value = part?.trim();
  if (!value || value.toUpperCase() === "N/A") return "";
  return value;
}

/**
 * RESO/USPS-style street line: number, pre-direction, name, suffix, post-direction.
 * NWMLS often stores grid-road directions (e.g. "240th St E") in `streetDirection`
 * with a null `streetDirectionPrefix` — those render after the suffix, not before
 * the street name.
 */
export function formatStreetAddress(a: StreetAddressParts | null | undefined): string {
  if (!a) return "";

  const number = clean(a.streetNumber);
  const prefix = clean(a.streetDirectionPrefix);
  let suffixDirection = clean(a.streetDirection);
  const name = clean(a.streetName);
  const suffix = clean(a.streetSuffix);
  const unit = clean(a.unitNumber);

  const parts: string[] = [];
  if (number) parts.push(number);

  if (prefix) {
    parts.push(prefix);
  } else if (suffixDirection && !suffix) {
    // Lone direction with no suffix → pre-directional (e.g. "123 N Main").
    parts.push(suffixDirection);
    suffixDirection = "";
  }

  if (name) parts.push(name);
  if (suffix) parts.push(suffix);
  if (suffixDirection) parts.push(suffixDirection);

  const street = parts.join(" ");
  if (!street) return "";
  return unit ? `${street} #${unit}` : street;
}

export function formatStreetAddressOrUnavailable(
  a: StreetAddressParts | null | undefined
): string {
  return formatStreetAddress(a) || "Address unavailable";
}
