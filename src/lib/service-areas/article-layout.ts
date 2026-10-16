/**
 * Presentation parser for service-area guide markdown.
 * Visible wording, heading levels, and link targets stay as authored.
 */

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleSection = {
  id: string;
  /** H2 markdown when this card is a real heading section. */
  heading: string | null;
  /** Link text for "On this page". Empty when the card is not in the TOC. */
  tocLabel: string;
  blocks: ArticleBlock[];
};

const HEADING_RE = /^(#{2,4})\s+(\S.*)$/;
const UL_RE = /^[-*]\s+(\S.*)$/;
const OL_RE = /^\d+\.\s+(\S.*)$/;
const QUOTE_RE = /^>\s?([\s\S]*)$/;

function isBlank(line: string): boolean {
  return line.trim() === "";
}

/** Replace inline markdown links with their visible labels. */
export function stripMarkdownInlines(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function blockSource(block: ArticleBlock): string {
  if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
  return block.text;
}

/**
 * Short "On this page" label drawn only from words already in the section.
 * Used when the guide has no H2s. Real H2 wording is never clipped.
 */
export function navigationLabel(plain: string): string {
  const text = plain.replace(/\s+/g, " ").trim();
  if (!text) return "Section";

  const clause = text.split(/\s[—–]\s/)[0]?.trim() ?? text;
  const base = clause.length >= 24 && clause.length <= 92 ? clause : text;
  const sentence = base.match(/^(.{16,}?[.!?])(?:\s|$)/);
  let label =
    sentence && sentence[1].length <= 92
      ? sentence[1].replace(/[.!?]+$/, "")
      : base.replace(/[.!?]+$/, "");

  if (label.length > 92) {
    const words = label.split(/\s+/);
    label = words.slice(0, 12).join(" ");
    if (words.length > 12) label += "…";
  }

  return label;
}

function slugify(text: string, used: Set<string>): string {
  const base = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  const root = base || "section";
  let id = root;
  let n = 2;
  while (used.has(id)) {
    id = `${root}-${n++}`;
  }
  used.add(id);
  return `guide-${id}`;
}

export function parseArticleBlocks(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    if (isBlank(lines[i])) {
      i += 1;
      continue;
    }

    const trimmed = lines[i].trim();
    const heading = HEADING_RE.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 2) blocks.push({ type: "h2", text });
      else if (level === 3) blocks.push({ type: "h3", text });
      else blocks.push({ type: "h4", text });
      i += 1;
      continue;
    }

    if (QUOTE_RE.test(trimmed)) {
      const parts: string[] = [];
      while (i < lines.length && QUOTE_RE.test(lines[i].trim())) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", text: parts.join(" ").replace(/\s+/g, " ").trim() });
      continue;
    }

    if (UL_RE.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && UL_RE.test(lines[i].trim())) {
        const match = UL_RE.exec(lines[i].trim());
        if (match) items.push(match[1].trim());
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (OL_RE.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && OL_RE.test(lines[i].trim())) {
        const match = OL_RE.exec(lines[i].trim());
        if (match) items.push(match[1].trim());
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && !isBlank(lines[i])) {
      const next = lines[i].trim();
      if (
        para.length > 0 &&
        (HEADING_RE.test(next) ||
          QUOTE_RE.test(next) ||
          UL_RE.test(next) ||
          OL_RE.test(next))
      ) {
        break;
      }
      para.push(next);
      i += 1;
    }
    const text = para.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "p", text });
  }

  return blocks;
}

export function buildArticleSections(markdown: string): ArticleSection[] {
  const blocks = parseArticleBlocks(markdown);
  const hasH2 = blocks.some((block) => block.type === "h2");
  const used = new Set<string>();

  if (!hasH2) {
    return blocks.map((block) => {
      const plain = stripMarkdownInlines(blockSource(block));
      const fromHeading = block.type === "h3" || block.type === "h4";
      return {
        id: slugify(plain, used),
        heading: null,
        tocLabel: fromHeading ? plain : navigationLabel(plain),
        blocks: [block],
      };
    });
  }

  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  const preamble: ArticleBlock[] = [];

  const flushPreamble = () => {
    for (const block of preamble) {
      const plain = stripMarkdownInlines(blockSource(block));
      sections.push({
        id: slugify(plain || "intro", used),
        heading: null,
        tocLabel: "",
        blocks: [block],
      });
    }
    preamble.length = 0;
  };

  for (const block of blocks) {
    if (block.type === "h2") {
      if (!current) flushPreamble();
      else sections.push(current);
      const plain = stripMarkdownInlines(block.text);
      current = {
        id: slugify(plain, used),
        heading: block.text,
        tocLabel: plain,
        blocks: [],
      };
      continue;
    }

    if (!current) preamble.push(block);
    else current.blocks.push(block);
  }

  if (!current) flushPreamble();
  else sections.push(current);

  return sections;
}

export function articleToc(sections: ArticleSection[]): { id: string; label: string }[] {
  return sections
    .filter((section) => section.tocLabel.length > 0)
    .map((section) => ({ id: section.id, label: section.tocLabel }));
}
