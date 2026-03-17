"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const solutions = [
  {
    title: "Home Search",
    href: "https://onsiteregroup.idxbroker.com/idx/map/mapsearch",
    external: true,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67d84788b3b88386e8c24f01_sell%20your%20home%20in%20east%20pierce%20county.jpg",
  },
  {
    title: "Home Valuation",
    href: "/free-home-evaluation",
    external: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67e16372192203004a84a865_We%20Help%20You%20Sell%20Your%20Home%20-%20Pierce%20County.jpg",
  },
  {
    title: "Buying & Selling",
    href: "/sell-your-home",
    external: false,
    image:
      "https://cdn.prod.website-files.com/67ad0482477bce360af7c269/67eac6e8fa81e2c2d72de275_HOME.webp",
  },
];

export default function Solutions() {
  return (
    <section className="relative py-8 sm:py-10 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {solutions.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative overflow-hidden"
          >
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SolutionCard title={item.title} image={item.image} />
              </a>
            ) : (
              <Link href={item.href}>
                <SolutionCard title={item.title} image={item.image} />
              </Link>
            )}
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] overflow-hidden cursor-pointer rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-all duration-700 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 flex items-end z-20 p-8 lg:p-12">
        <div>
          <h3 className="font-serif text-2xl lg:text-3xl text-white font-light">
            {title}
          </h3>
          <div className="mt-3 w-0 group-hover:w-12 h-px bg-white transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
