import { NextRequest, NextResponse } from "next/server";

const API = "https://api.repliers.io/listings";
const KEY = process.env.REPLIERS_API_KEY || "";

async function repliersGet(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API}?${qs}`, {
    headers: { "repliers-api-key": KEY },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

function buildScope(req: NextRequest): Record<string, string> {
  // Default to WA so market stats reflect the correct geography. NOTE: do not
  // force boardId — this production key returns zero results / empty
  // statistics whenever boardId=110 is set, so it must be omitted (or passed
  // explicitly) for the NWMLS feed to come back.
  const scope: Record<string, string> = {
    state: "WA",
  };
  const state = req.nextUrl.searchParams.get("state");
  const city = req.nextUrl.searchParams.get("city");
  const county = req.nextUrl.searchParams.get("county");
  const neighborhood = req.nextUrl.searchParams.get("neighborhood");
  const boardId = req.nextUrl.searchParams.get("boardId");
  if (state) scope.state = state;
  if (city) scope.city = city;
  else if (county) scope.area = county;
  if (neighborhood) scope.neighborhood = neighborhood;
  if (boardId) scope.boardId = boardId;
  return scope;
}

export async function GET(req: NextRequest) {
  const scope = buildScope(req);

  const includeChart = req.nextUrl.searchParams.get("chart") === "true";

  const now = new Date();
  const fourMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, 1)
    .toISOString()
    .split("T")[0];
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), 1)
    .toISOString()
    .split("T")[0];

  try {
    const fetches: Promise<unknown>[] = [
      repliersGet({
        ...scope,
        status: "A",
        statistics: "cnt-available,cnt-new,grp-mth",
        listings: "false",
      }),
      repliersGet({
        ...scope,
        status: "U",
        lastStatus: "Sld",
        minSoldDate: fourMonthsAgo,
        statistics:
          "med-soldPrice,sum-soldPrice,cnt-closed,avg-daysOnMarket,grp-mth",
        listings: "false",
      }),
    ];

    if (includeChart) {
      fetches.push(
        repliersGet({
          ...scope,
          status: "U",
          lastStatus: "Sld",
          minSoldDate: twoYearsAgo,
          statistics: "med-soldPrice,med-daysOnMarket,grp-mth",
          listings: "false",
        })
      );
    }

    const results = await Promise.all(fetches);
    const [active, sold, chart] = results as [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any, any, any
    ];

    const response: Record<string, unknown> = {
      scope,
      active: active?.statistics ?? null,
      sold: sold?.statistics ?? null,
    };

    if (includeChart && chart?.statistics) {
      response.chart = chart.statistics;
    }

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}
