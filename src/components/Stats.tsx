"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const end = target;

    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 10,
    prefix: "",
    suffix: "+",
    label: "Years of Experience",
    sublabel: "Serving Pierce County",
  },
  {
    value: 300,
    prefix: "",
    suffix: "+",
    label: "Properties Sold",
    sublabel: "Across East Pierce County",
  },
  {
    value: 100,
    prefix: "$",
    suffix: "M+",
    label: "In Home Sales",
    sublabel: "And Counting",
  },
];

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#f2ede6]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-28">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="font-serif text-[clamp(3rem,5.5vw,4.5rem)] font-light text-charcoal leading-none">
                <Counter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-charcoal font-medium">
                {stat.label}
              </p>
              <p className="mt-1 text-[12px] tracking-wide text-mid-gray">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
