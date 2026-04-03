"use client";

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function InventoryGauge({ months }: { months: number }) {
  const clamped = Math.min(Math.max(months, 0), 12);
  const needleDeg = 180 + (clamped / 12) * 180; // 180° (left) to 360° (right)

  // Tight geometry: center at bottom-center of viewBox, arc fills width
  const cx = 150;
  const cy = 140;
  const r = 120;
  const sw = 30;

  // 3 segments matching the 3 legend items
  const segments = [
    { start: 180, end: 240, color: "#16a34a" },  // green — seller's
    { start: 242, end: 300, color: "#f59e0b" },  // amber — balanced  
    { start: 302, end: 360, color: "#dc2626" },  // red — buyer's
  ];

  const toRad = (d: number) => (d * Math.PI) / 180;
  const needleLen = r - 18;
  const needleX = cx + needleLen * Math.cos(toRad(needleDeg));
  const needleY = cy + needleLen * Math.sin(toRad(needleDeg));

  const marketColor = clamped < 4 ? "bg-green-600" : clamped <= 6 ? "bg-amber-500" : "bg-red-600";

  // viewBox: arc spans from (cx-r-sw/2) to (cx+r+sw/2) horizontally, top is cy-r-sw/2
  // Crop: x=0 y=0 to 300x155 (semicircle fits tightly)
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-[#faf9f7] p-8 flex flex-col items-center justify-center h-full">
      <h3 className="text-[1.4rem] font-bold tracking-tight text-charcoal mb-6 text-center w-full">
        Inventory Graph
      </h3>

      <svg viewBox="0 0 300 150" className="w-full max-w-[300px]">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(cx, cy, r, seg.start, seg.end)}
            fill="none"
            stroke={seg.color}
            strokeWidth={sw}
            strokeLinecap="butt"
          />
        ))}

        {/* Rounded caps on first and last */}
        <path d={arcPath(cx, cy, r, 180, 183)} fill="none" stroke="#16a34a" strokeWidth={sw} strokeLinecap="round" />
        <path d={arcPath(cx, cy, r, 357, 360)} fill="none" stroke="#dc2626" strokeWidth={sw} strokeLinecap="round" />

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#1a1a18"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="8" fill="#1a1a18" />
        <circle cx={cx} cy={cy} r="4" fill="#fff" />
      </svg>

      {/* Value badge */}
      <div className={`${marketColor} rounded-full px-5 py-2 mt-4`}>
        <p className="text-[13px] font-bold text-white tracking-wide">
          {months.toFixed(1)} months of inventory
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600" />
          <span className="text-[12px] font-medium text-charcoal/80">Seller&apos;s</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-[12px] font-medium text-charcoal/80">Balanced</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600" />
          <span className="text-[12px] font-medium text-charcoal/80">Buyer&apos;s</span>
        </div>
      </div>
    </div>
  );
}
