import fs from "node:fs";
import path from "node:path";

import {
  posts as legacyPosts,
  type BlogPost as LegacyBlogPost,
} from "./posts";

export type BlogAccent = "red" | "yellow" | "green";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;

  accent: BlogAccent;
  featured: boolean;

  image?: string;
  imageAlt?: string;
  imageCaption?: string;

  tool?: string;
  toolPath?: string;

  content: string;
};

type FrontmatterValue = string | string[] | boolean;

type Frontmatter = Record<string, FrontmatterValue>;

const BLOG_DIRECTORY = path.join(
  process.cwd(),
  "app",
  "content",
  "blog"
);

const MONTHS: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

function removeQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw: string): {
  metadata: Frontmatter;
  content: string;
} {
  const normalized = raw.replace(/\r\n/g, "\n");

  const match = normalized.match(
    /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  );

  if (!match) {
    return {
      metadata: {},
      content: normalized.trim(),
    };
  }

  const frontmatterBlock = match[1];
  const content = match[2].trim();

  const metadata: Frontmatter = {};

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line
      .slice(0, separatorIndex)
      .trim();

    const rawValue = line
      .slice(separatorIndex + 1)
      .trim();

    if (!key) {
      continue;
    }

    if (
      rawValue.startsWith("[") &&
      rawValue.endsWith("]")
    ) {
      metadata[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => removeQuotes(item.trim()))
        .filter(Boolean);

      continue;
    }

    if (rawValue === "true") {
      metadata[key] = true;
      continue;
    }

    if (rawValue === "false") {
      metadata[key] = false;
      continue;
    }

    metadata[key] = removeQuotes(rawValue);
  }

  return {
    metadata,
    content,
  };
}

function getString(
  metadata: Frontmatter,
  key: string,
  fallback = ""
) {
  const value = metadata[key];

  if (typeof value === "string") {
    return value;
  }

  return fallback;
}

function getBoolean(
  metadata: Frontmatter,
  key: string,
  fallback = false
) {
  const value = metadata[key];

  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

function requiredString(
  metadata: Frontmatter,
  key: string,
  fileName: string
) {
  const value = getString(metadata, key);

  if (!value) {
    throw new Error(
      `Falta "${key}" en el frontmatter de ${fileName}`
    );
  }

  return value;
}

function normalizeAccent(
  accent: string
): BlogAccent {
  if (
    accent === "yellow" ||
    accent === "green"
  ) {
    return accent;
  }

  return "red";
}

function normalizeLegacyDate(
  value: string
): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const match = normalized.match(
    /^(\d{1,2}) de ([a-z]+),?\s+(\d{4})$/
  );

  if (!match) {
    return "2026-01-01";
  }

  const [, rawDay, monthName, year] = match;

  const month = MONTHS[monthName] ?? "01";

  const day = rawDay.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function legacyPostToMarkdown(
  post: LegacyBlogPost
): string {
  const sections = post.content.sections.map(
    (section) => {
      const body = section.body
        .map((paragraph) => `- ${paragraph}`)
        .join("\n");

      return `## ${section.title}\n\n${body}`;
    }
  );

  return [
    post.content.intro,
    ...sections,
  ].join("\n\n");
}

function convertLegacyPost(
  post: LegacyBlogPost
): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    readTime: post.readTime,

    date: normalizeLegacyDate(post.date),

    accent: post.accent,

    featured: false,

    image: post.image,
    imageAlt: post.imageAlt,

    tool: "Usar la Calculadora de Asados",
    toolPath: "/calculadora",

    content: legacyPostToMarkdown(post),
  };
}

function parseMarkdownFile(
  fileName: string
): BlogPost {
  const fullPath = path.join(
    BLOG_DIRECTORY,
    fileName
  );

  const raw = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const {
    metadata,
    content,
  } = parseFrontmatter(raw);

  const slug =
    getString(metadata, "slug") ||
    fileName.replace(/\.md$/, "");

  const date = requiredString(
    metadata,
    "date",
    fileName
  );

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `La fecha de ${fileName} debe tener formato YYYY-MM-DD`
    );
  }

  return {
    slug,

    title: requiredString(
      metadata,
      "title",
      fileName
    ),

    category: getString(
      metadata,
      "category",
      "Guías"
    ),

    excerpt: requiredString(
      metadata,
      "excerpt",
      fileName
    ),

    readTime: getString(
      metadata,
      "readTime",
      "5 min de lectura"
    ),

    date,

    accent: normalizeAccent(
      getString(
        metadata,
        "accent",
        "red"
      )
    ),

    featured: getBoolean(
      metadata,
      "featured",
      false
    ),

    image:
      getString(metadata, "image") ||
      undefined,

    imageAlt:
      getString(metadata, "imageAlt") ||
      undefined,

    imageCaption:
      getString(
        metadata,
        "imageCaption"
      ) || undefined,

    tool:
      getString(metadata, "tool") ||
      undefined,

    toolPath:
      getString(
        metadata,
        "toolPath"
      ) || undefined,

    content,
  };
}

function getMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) =>
      fileName.endsWith(".md")
    )
    .map(parseMarkdownFile);
}

export function getAllPosts(): BlogPost[] {
  const markdownPosts =
    getMarkdownPosts();

  const markdownSlugs = new Set(
    markdownPosts.map((post) => post.slug)
  );

  const convertedLegacyPosts =
    legacyPosts
      .filter(
        (post) =>
          !markdownSlugs.has(post.slug)
      )
      .map(convertLegacyPost);

  return [
    ...markdownPosts,
    ...convertedLegacyPosts,
  ].sort(
    (a, b) =>
      new Date(
        `${b.date}T00:00:00Z`
      ).getTime() -
      new Date(
        `${a.date}T00:00:00Z`
      ).getTime()
  );
}

export function getPostBySlug(
  slug: string
): BlogPost | undefined {
  return getAllPosts().find(
    (post) => post.slug === slug
  );
}

export function getFeaturedPost():
  BlogPost | undefined {
  const posts = getAllPosts();

  return (
    posts.find(
      (post) => post.featured
    ) ?? posts[0]
  );
}

export function formatPostDate(
  date: string
): string {
  return new Intl.DateTimeFormat(
    "es-CL",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(
    new Date(`${date}T00:00:00Z`)
  );
}

export function categoryToSlug(
  category: string
) {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategories() {
  return Array.from(
    new Set(
      getAllPosts().map(
        (post) => post.category
      )
    )
  ).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export function getRelatedPosts(
  post: BlogPost,
  limit = 3
) {
  const posts = getAllPosts().filter(
    (item) => item.slug !== post.slug
  );

  const sameCategory = posts.filter(
    (item) =>
      item.category === post.category
  );

  const otherPosts = posts.filter(
    (item) =>
      item.category !== post.category
  );

  return [
    ...sameCategory,
    ...otherPosts,
  ].slice(0, limit);
}