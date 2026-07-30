export type LocalAttraction = {
  name: string;
  url: string;
  description: string;
};

export type ServiceAreaDiscover = {
  slug: string;
  attractions: LocalAttraction[];
  /** Markdown paragraphs with inline [text](url) links */
  localLivingMarkdown: string[];
  updatedAt: string;
};
