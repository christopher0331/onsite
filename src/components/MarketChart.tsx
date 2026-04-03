"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartData = {
  soldPrice?: {
    med: number;
    mth: Record<string, { med: number; count: number }>;
  };
  daysOnMarket?: {
    med: number;
    mth: Record<string, { med: number; count: number }>;
  };
};

function fmtPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function MarketChart({
  data,
  city,
}: {
  data: ChartData;
  city: string;
}) {
  const priceMth = data.soldPrice?.mth ?? {};
  const domMth = data.daysOnMarket?.mth ?? {};

  const months = [
    ...new Set([...Object.keys(priceMth), ...Object.keys(domMth)]),
  ].sort();

  const points = months.map((m) => ({
    month: monthLabel(m),
    price: priceMth[m]?.med ?? null,
    dom: domMth[m]?.med ?? null,
  }));

  if (points.length === 0) return null;

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-[#faf9f7] p-8 h-full flex flex-col">
      <h3 className="text-[1.4rem] font-bold tracking-tight text-charcoal mb-1">
        Sold Price &amp; Days On Market in {city}
      </h3>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-6 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-4 h-[3px] rounded-full bg-[#1a1a18]" />
          <span className="text-[12px] font-medium text-charcoal/80">Median Sold Price</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-[3px] rounded-full bg-[#0d9488]" />
          <span className="text-[12px] font-medium text-charcoal/80">Median Days on Market</span>
        </div>
      </div>

      <div className="flex-1 min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0ddd6" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#555", fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#d4d0c8" }}
              interval={Math.max(0, Math.floor(points.length / 7) - 1)}
              dy={8}
            />
            <YAxis
              yAxisId="price"
              orientation="left"
              tick={{ fontSize: 11, fill: "#555", fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => fmtPrice(v)}
              width={75}
            />
            <YAxis
              yAxisId="dom"
              orientation="right"
              tick={{ fontSize: 11, fill: "#0d9488", fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v} days`}
              width={60}
            />
            <Tooltip
              contentStyle={{
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 12,
                border: "none",
                background: "#1a1a18",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,.2)",
                padding: "10px 16px",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#aaa", fontSize: 11, marginBottom: 4 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) =>
                name === "Median Sold Price"
                  ? [fmtPrice(value as number), name]
                  : [`${value} days`, name]
              }
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              name="Median Sold Price"
              stroke="#1a1a18"
              strokeWidth={2.5}
              dot={false}
              connectNulls
              activeDot={{ r: 5, fill: "#1a1a18", strokeWidth: 0 }}
            />
            <Line
              yAxisId="dom"
              type="monotone"
              dataKey="dom"
              name="Median Days on Market"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={false}
              connectNulls
              activeDot={{ r: 5, fill: "#0d9488", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
