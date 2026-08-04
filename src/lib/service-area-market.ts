import type { CardListing } from "@/components/ListingCard";
import { enrichListingsResponse, repliersListingsUrl } from "@/lib/repliers-enrich";

const API = "https://api.repliers.io/listings";

export type SoldListingRow = CardListing & {
  soldDate?: string | null;
  daysOnMarket?: number | null;
  simpleDaysOnMarket?: number | null;
};

export type MarketPulseSnapshot = {
  label: string;
  zip?: string;
  activeListings: number | null;
  medianSoldPrice: number | null;
  avgDaysOnMarket: number | null;
  closedCount: number | null;
  monthsOfInventory: number | null;
};

export type MarketPulseResult = {
  asOf: string;
  citywide: MarketPulseSnapshot | null;
  byZip: MarketPulseSnapshot[];
};

type StatsPayload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  active?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sold?: any;
};

function recentMonths(
  obj: Record<string, unknown> | undefined | null,
  n: number
): string[] {
  if (!obj || typeof obj !== "object") return [];
  return Object.keys(obj).sort().slice(-n);
}

async function repliersStatistics(
  scope: Record<string, string>
): Promise<StatsPayload | null> {
  const key = process.env.REPLIERS_API_KEY || "";
  if (!key) return null;

  const now = new Date();
  const fourMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, 1)
    .toISOString()
    .split("T")[0];

  const common = { ...scope, listings: "false" };

  try {
    const [activeRes, soldRes] = await Promise.all([
      fetch(
        `${API}?${new URLSearchParams({
          ...common,
          status: "A",
          statistics: "cnt-available,cnt-new,grp-mth",
        })}`,
        {
          headers: { "repliers-api-key": key },
          next: { revalidate: 3600 },
        }
      ),
      fetch(
        `${API}?${new URLSearchParams({
          ...common,
          status: "U",
          lastStatus: "Sld",
          minSoldDate: fourMonthsAgo,
          statistics:
            "med-soldPrice,sum-soldPrice,cnt-closed,avg-daysOnMarket,grp-mth",
        })}`,
        {
          headers: { "repliers-api-key": key },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!activeRes.ok && !soldRes.ok) return null;

    const active = activeRes.ok ? await activeRes.json() : null;
    const sold = soldRes.ok ? await soldRes.json() : null;
    return {
      active: active?.statistics ?? null,
      sold: sold?.statistics ?? null,
    };
  } catch {
    return null;
  }
}

function summarizeSnapshot(
  label: string,
  stats: StatsPayload | null,
  zip?: string
): MarketPulseSnapshot | null {
  if (!stats?.active && !stats?.sold) return null;

  const availMths = recentMonths(stats.active?.available?.mth, 1);
  const latestAvail = availMths[availMths.length - 1];
  const activeListings =
    latestAvail != null
      ? Number(stats.active?.available?.mth?.[latestAvail] ?? NaN)
      : null;

  const closedMths = recentMonths(stats.sold?.closed?.mth, 3);
  const avgMonthlySold =
    closedMths.length > 0
      ? closedMths.reduce(
          (sum, m) => sum + Number(stats.sold?.closed?.mth?.[m]?.count ?? 0),
          0
        ) / closedMths.length
      : 0;

  const monthsOfInventory =
    activeListings != null &&
    !Number.isNaN(activeListings) &&
    avgMonthlySold > 0
      ? activeListings / avgMonthlySold
      : null;

  const medianSoldPrice =
    typeof stats.sold?.soldPrice?.med === "number"
      ? stats.sold.soldPrice.med
      : null;

  const avgDaysOnMarket =
    typeof stats.sold?.daysOnMarket?.avg === "number"
      ? stats.sold.daysOnMarket.avg
      : typeof stats.sold?.daysOnMarket?.med === "number"
        ? stats.sold.daysOnMarket.med
        : null;

  let closedCount: number | null = null;
  if (typeof stats.sold?.closed?.count === "number") {
    closedCount = stats.sold.closed.count;
  } else if (closedMths.length > 0) {
    closedCount = closedMths.reduce(
      (sum, m) => sum + Number(stats.sold?.closed?.mth?.[m]?.count ?? 0),
      0
    );
  }

  return {
    label,
    zip,
    activeListings:
      activeListings != null && !Number.isNaN(activeListings)
        ? activeListings
        : null,
    medianSoldPrice,
    avgDaysOnMarket,
    closedCount,
    monthsOfInventory,
  };
}

export async function getServiceAreaMarketPulse(
  cityName: string,
  zipCodes: string[] = []
): Promise<MarketPulseResult> {
  const asOf = new Date().toISOString().slice(0, 10);
  const base = { state: "WA", city: cityName };

  const cityStats = await repliersStatistics(base);
  const citywide = summarizeSnapshot(cityName, cityStats);

  const byZip: MarketPulseSnapshot[] = [];
  const uniqueZips = [...new Set(zipCodes.filter((z) => /^\d{5}$/.test(z)))];

  if (uniqueZips.length > 0) {
    const zipResults = await Promise.all(
      uniqueZips.map(async (zip) => {
        const stats = await repliersStatistics({ state: "WA", zip });
        return summarizeSnapshot(zip, stats, zip);
      })
    );
    for (const row of zipResults) {
      if (row) byZip.push(row);
    }
  }

  return { asOf, citywide, byZip };
}

export async function getServiceAreaSoldListings(
  cityName: string,
  limit = 8
): Promise<SoldListingRow[]> {
  const params = new URLSearchParams({
    resultsPerPage: String(Math.min(Math.max(limit, 1), 40)),
    pageNum: "1",
    state: "WA",
    city: cityName,
    sortBy: "soldDateDesc",
    standardStatus: "Closed",
  });

  try {
    const res = await fetch(repliersListingsUrl(`?${params.toString()}`), {
      headers: {
        "repliers-api-key": process.env.REPLIERS_API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];

    const data = enrichListingsResponse(await res.json()) as {
      listings?: SoldListingRow[];
    };
    const rows = Array.isArray(data.listings) ? data.listings : [];
    return rows.slice(0, limit);
  } catch {
    return [];
  }
}
