import blogData from "@/lib/blog-data.json";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  catSlug: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  body: string;
};

export type BlogCard = {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  isNew: boolean;
};

const posts = blogData as Record<string, BlogPost>;

const NEW_SINCE = Date.parse("January 1, 2026");

function dateValue(date: string) {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts[slug];
}

export function getAllBlogPosts(): BlogPost[] {
  return Object.values(posts);
}

export function getPostsByCategory(catSlug: string): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.catSlug === catSlug)
    .sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

export function isNewPost(post: Pick<BlogPost, "date">) {
  return dateValue(post.date) >= NEW_SINCE;
}

export function getCategoryCards(catSlug: string): BlogCard[] {
  return getPostsByCategory(catSlug).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    image: post.image,
    isNew: isNewPost(post),
  }));
}
