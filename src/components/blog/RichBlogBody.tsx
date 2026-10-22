import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlogLinkedText } from "@/lib/service-areas/linkify";

/**
 * Rich blog body renderer, used only for posts with `format: "rich"`.
 * Legacy posts keep the plain-text renderer in the page, so they are unaffected.
 *
 * Line syntax (one block per line):
 *   ## Heading / ### Subheading   headings; h2s get ids and feed the TOC
 *   [[toc]]                       table of contents from all h2s
 *   ---                           section divider
 *   - item / 1. item              bullet / numbered lists
 *   | a | b |                     table (first row is the header; |---| rows skipped)
 *   ![alt](src "caption")         figure; caption may contain [credit](url) links
 *   :::quick|tip|warning|checklist|cta Title  ... :::   styled boxes (nested blocks allowed)
 *   [button:Label](/href)         CTA button (inside boxes)
 */

type Ctx = { used: Set<string>; key: () => string };

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Inline({ text, ctx }: { text: string; ctx: Ctx }) {
  return <BlogLinkedText text={text} usedHrefs={ctx.used} />;
}

const ICONS: Record<string, ReactNode> = {
  quick: (
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
  ),
  tip: (
    <>
      <path d="M9 18h6M10 22h4" strokeLinecap="round" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" strokeLinejoin="round" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2 20h20L12 3Z" strokeLinejoin="round" />
      <path d="M12 10v4M12 17.5v.01" strokeLinecap="round" />
    </>
  ),
  checklist: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="m8 9 2 2 4-4M8 16h8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

const BOX_STYLES: Record<string, string> = {
  quick: "border border-charcoal/10 bg-[#f2ede6]",
  tip: "border-l-4 border-charcoal bg-[#f5f3f0]",
  warning: "border-l-4 border-[#b7791f] bg-[#fdf6ec]",
  checklist: "border border-charcoal/15 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]",
};

const BOX_LABEL: Record<string, string> = {
  quick: "Quick answers",
  tip: "Local tip",
  warning: "Watch out",
  checklist: "Checklist",
};

type Heading = { id: string; text: string };

function collectHeadings(lines: string[]): Heading[] {
  return lines
    .filter((l) => /^##\s/.test(l.trim()))
    .map((l) => {
      const text = l.trim().replace(/^##\s+/, "");
      return { id: slugifyHeading(text), text };
    });
}

function renderBlocks(lines: string[], ctx: Ctx, headings: Heading[]): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // Boxes
    const box = line.match(/^:::(quick|tip|warning|checklist|cta)\s*(.*)$/);
    if (box) {
      const [, kind, title] = box;
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") inner.push(lines[i++]);
      i++;
      const children = renderBlocks(inner, ctx, headings);
      if (kind === "cta") {
        out.push(
          <aside key={ctx.key()} className="my-12 overflow-hidden rounded-3xl bg-[#1a1a18] p-8 text-white sm:p-10 [&_li]:text-white/85 [&_li_a]:text-white [&_p]:text-white/80 [&_p_a]:text-white">
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-white/60">OnSite Real Estate Group</p>
            {title && <h2 className="mb-5 font-serif text-[1.8rem] font-light leading-snug text-white">{title}</h2>}
            {children}
          </aside>
        );
      } else {
        out.push(
          <aside key={ctx.key()} className={`my-10 rounded-2xl p-6 sm:p-8 ${BOX_STYLES[kind]}`}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
                  {ICONS[kind]}
                </svg>
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-mid-gray">{BOX_LABEL[kind]}</p>
                {title && <p className="font-serif text-[1.2rem] leading-snug text-charcoal">{title}</p>}
              </div>
            </div>
            <div className="[&>*:last-child]:mb-0">{children}</div>
          </aside>
        );
      }
      continue;
    }

    if (line === "[[toc]]") {
      out.push(
        <nav key={ctx.key()} aria-label="Table of contents" className="my-10 rounded-2xl border border-charcoal/10 p-6 sm:p-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-mid-gray">In this guide</p>
          <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {headings.map((h, n) => (
              <li key={h.id} className="flex gap-3 text-[15px] leading-6">
                <span className="w-6 shrink-0 font-serif text-charcoal/40">{String(n + 1).padStart(2, "0")}</span>
                <a href={`#${h.id}`} className="text-charcoal underline decoration-charcoal/20 underline-offset-4 hover:decoration-charcoal">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      );
      i++;
      continue;
    }

    if (line === "---") {
      out.push(
        <div key={ctx.key()} className="my-14 flex items-center gap-4" role="separator" aria-hidden>
          <span className="h-px flex-1 bg-charcoal/10" />
          <span className="h-1.5 w-1.5 rotate-45 bg-charcoal/30" />
          <span className="h-px flex-1 bg-charcoal/10" />
        </div>
      );
      i++;
      continue;
    }

    const h = line.match(/^(##|###)\s+(.*)$/);
    if (h) {
      const text = h[2];
      if (h[1] === "##") {
        out.push(
          <h2 key={ctx.key()} id={slugifyHeading(text)} className="mb-5 mt-4 scroll-mt-28 font-serif text-[1.75rem] font-light leading-snug text-charcoal">
            {text}
          </h2>
        );
      } else {
        out.push(
          <h3 key={ctx.key()} className="mb-3 mt-8 text-[13px] font-medium uppercase tracking-[0.2em] text-charcoal">
            {text}
          </h3>
        );
      }
      i++;
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\((\S+)(?:\s+"(.*)")?\)$/);
    if (img) {
      const [, alt, src, caption] = img;
      out.push(
        <figure key={ctx.key()} className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#f2ede6]">
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 860px) 100vw, 760px" />
          </div>
          {caption && (
            <figcaption className="mt-3 text-[12px] leading-5 text-mid-gray">
              <Inline text={caption} ctx={{ ...ctx, used: new Set() }} />
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    const btn = line.match(/^\[button:([^\]]+)\]\(([^)]+)\)$/);
    if (btn) {
      const buttons: { label: string; href: string }[] = [];
      while (i < lines.length) {
        const m = lines[i].trim().match(/^\[button:([^\]]+)\]\(([^)]+)\)$/);
        if (!m) break;
        buttons.push({ label: m[1], href: m[2] });
        i++;
      }
      out.push(
        <div key={ctx.key()} className="mt-6 flex flex-wrap gap-3">
          {buttons.map((b, n) => (
            <Link
              key={b.href}
              href={b.href}
              className={
                n === 0
                  ? "inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] text-charcoal no-underline transition hover:bg-white/90"
                  : "inline-flex items-center rounded-full border border-white/35 px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] text-white no-underline transition hover:bg-white/10"
              }
            >
              {b.label}
            </Link>
          ))}
        </div>
      );
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const r = lines[i].trim();
        i++;
        if (/^\|[\s:|-]+\|$/.test(r)) continue;
        rows.push(r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
      }
      const [head, ...body] = rows;
      out.push(
        <div key={ctx.key()} className="my-10 space-y-3 sm:hidden">
          {body.map((r, rn) => (
            <div key={rn} className="rounded-2xl border border-charcoal/10 bg-white p-5">
              <p className="mb-3 font-serif text-[1.1rem] leading-snug text-charcoal">
                <Inline text={r[0]} ctx={ctx} />
              </p>
              <dl className="space-y-2">
                {r.slice(1).map((c, n) => (
                  <div key={n}>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-mid-gray">{head[n + 1]}</dt>
                    <dd className="text-[15px] leading-6 text-charcoal/90"><Inline text={c} ctx={ctx} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      );
      out.push(
        <div key={ctx.key()} className="my-10 hidden overflow-x-auto rounded-2xl border border-charcoal/10 sm:block">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14px] leading-6">
            <thead className="bg-[#f2ede6]">
              <tr>
                {head.map((c, n) => (
                  <th key={n} scope="col" className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, rn) => (
                <tr key={rn} className="border-t border-charcoal/10 align-top">
                  {r.map((c, n) => (
                    <td key={n} className={`px-4 py-3 text-charcoal/90 ${n === 0 ? "font-medium" : ""}`}>
                      <Inline text={c} ctx={ctx} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^(-|\d+\.)\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (ordered ? !/^\d+\.\s/.test(l) : !/^-\s/.test(l)) break;
        items.push(l.replace(/^(-|\d+\.)\s+/, ""));
        i++;
      }
      out.push(
        ordered ? (
          <ol key={ctx.key()} className="mb-6 space-y-4">
            {items.map((t, n) => (
              <li key={n} className="flex items-start gap-4 text-[16px] leading-7 text-charcoal/90">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal text-[12px] text-white">{n + 1}</span>
                <span className="pt-0.5"><Inline text={t} ctx={ctx} /></span>
              </li>
            ))}
          </ol>
        ) : (
          <ul key={ctx.key()} className="mb-6 space-y-3">
            {items.map((t, n) => (
              <li key={n} className="flex items-start gap-3 text-[16px] leading-7 text-charcoal/90">
                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/40" />
                <span><Inline text={t} ctx={ctx} /></span>
              </li>
            ))}
          </ul>
        )
      );
      continue;
    }

    out.push(
      <p key={ctx.key()} className="mb-6 text-[16px] leading-8 text-charcoal/90">
        <Inline text={line} ctx={ctx} />
      </p>
    );
    i++;
  }
  return out;
}

export default function RichBlogBody({ body }: { body: string }) {
  const lines = body.split("\n");
  let n = 0;
  const ctx: Ctx = { used: new Set(), key: () => `rb-${n++}` };
  return <>{renderBlocks(lines, ctx, collectHeadings(lines))}</>;
}
