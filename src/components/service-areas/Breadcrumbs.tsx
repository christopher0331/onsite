import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
};

export default function Breadcrumbs({ items, variant = "dark" }: Props) {
  const linkClass =
    variant === "light"
      ? "text-charcoal/80 underline-offset-4 hover:text-charcoal hover:underline"
      : "text-white/85 hover:text-white";
  const currentClass =
    variant === "light" ? "text-charcoal font-semibold" : "text-white font-semibold";
  const separatorClass =
    variant === "light" ? "text-charcoal/40" : "text-white/70";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] leading-6">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`${linkClass} transition-colors duration-300`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? currentClass : linkClass}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className={separatorClass}>
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
