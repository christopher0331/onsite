import type { MarketPulseResult } from "@/lib/service-area-market";

type Props = {
  cityName: string;
  pulse: MarketPulseResult;
};

function formatPrice(n: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return "$" + Math.round(n).toLocaleString("en-US");
}

function formatNum(n: number | null, digits = 0) {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-5 sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-charcoal/55 mb-2">
        {label}
      </p>
      <p className="font-serif text-[clamp(1.6rem,2.5vw,2.1rem)] font-light text-charcoal leading-none">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-[12px] leading-5 text-charcoal/60">{hint}</p>
      ) : null}
    </div>
  );
}

export default function MarketPulse({ cityName, pulse }: Props) {
  const c = pulse.citywide;
  if (!c && pulse.byZip.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-warm-gray/50 border-t border-charcoal/8">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-charcoal/60 mb-4">
              Market Pulse · {cityName}
            </p>
            <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light text-charcoal leading-[1.1]">
              Live {cityName} numbers — not national headlines.
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed text-charcoal/70 max-w-md lg:text-right">
            As of {pulse.asOf}. Statistics via{" "}
            <a
              href="https://repliers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-charcoal"
            >
              Repliers
            </a>{" "}
            / NWMLS (MLS Grid). Sold metrics use recent closed sales.
          </p>
        </div>

        {c ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <StatCard
              label="Active listings"
              value={formatNum(c.activeListings)}
              hint="Currently on market"
            />
            <StatCard
              label="Median sold"
              value={formatPrice(c.medianSoldPrice)}
              hint="Recent closed sales"
            />
            <StatCard
              label="Avg days on market"
              value={formatNum(c.avgDaysOnMarket, 0)}
              hint="Recent closed sales"
            />
            <StatCard
              label="Months of inventory"
              value={formatNum(c.monthsOfInventory, 1)}
              hint={
                c.closedCount != null
                  ? `${formatNum(c.closedCount)} closed in window`
                  : "Active ÷ avg monthly closed"
              }
            />
          </div>
        ) : null}

        {pulse.byZip.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-charcoal/10 text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                  <th className="px-5 py-4 font-medium">ZIP</th>
                  <th className="px-5 py-4 font-medium">Active</th>
                  <th className="px-5 py-4 font-medium">Median sold</th>
                  <th className="px-5 py-4 font-medium">Avg DOM</th>
                  <th className="px-5 py-4 font-medium">Mo. supply</th>
                </tr>
              </thead>
              <tbody>
                {pulse.byZip.map((row) => (
                  <tr
                    key={row.zip ?? row.label}
                    className="border-b border-charcoal/6 last:border-0"
                  >
                    <td className="px-5 py-3.5 font-medium text-charcoal">
                      {row.zip ?? row.label}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {formatNum(row.activeListings)}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {formatPrice(row.medianSoldPrice)}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {formatNum(row.avgDaysOnMarket, 0)}
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {formatNum(row.monthsOfInventory, 1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
