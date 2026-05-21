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
      ? "text-charcoal/70 hover:text-charcoal"
      : "text-white/85 hover:text-white";
  const currentClass = variant === "light" ? "text-charcoal" : "text-white";
  const separatorClass =
    variant === "light" ? "text-charcoal/50" : "text-white/70";

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.25em]">
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
                <span className={isLast ? currentClass : linkClass}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className={separatorClass}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
