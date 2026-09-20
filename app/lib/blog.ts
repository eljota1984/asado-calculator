import fs from "node:fs";
import path from "node:path";

export type BlogAccent =
  | "red"
  | "yellow"
  | "green";

export type BlogPost = {
  slug: string;

  title: string;

  // Título específico para SEO.
  // Si no existe, se utilizará title.
  seoTitle?: string;

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

type FrontmatterValue =
  | string
  | boolean;

type Frontmatter =
  Record<string, FrontmatterValue>;

const BLOG_DIRECTORY = path.join(
  process.cwd(),
  "app",
  "content",
  "blog"
);

function removeQuotes(
  value: string
): string {
  return value.replace(
    /^["']|["']$/g,
    ""
  );
}

function parseFrontmatter(
  raw: string
): {
  metadata: Frontmatter;
  content: string;
} {
  const normalized =
    raw.replace(/\r\n/g, "\n");

  const match =
    normalized.match(
      /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
    );

  if (!match) {
    return {
      metadata: {},
      content:
        normalized.trim(),
    };
  }

  const frontmatterBlock =
    match[1];

  const content =
    match[2].trim();

  const metadata:
    Frontmatter = {};

  for (
    const line of
    frontmatterBlock.split("\n")
  ) {
    const separatorIndex =
      line.indexOf(":");

    if (
      separatorIndex === -1
    ) {
      continue;
    }

    const key = line
      .slice(
        0,
        separatorIndex
      )
      .trim();

    const rawValue = line
      .slice(
        separatorIndex + 1
      )
      .trim();

    if (!key) {
      continue;
    }

    if (
      rawValue === "true"
    ) {
      metadata[key] = true;
      continue;
    }

    if (
      rawValue === "false"
    ) {
      metadata[key] = false;
      continue;
    }

    metadata[key] =
      removeQuotes(rawValue);
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
): string {
  const value =
    metadata[key];

  return typeof value ===
    "string"
    ? value
    : fallback;
}

function getBoolean(
  metadata: Frontmatter,
  key: string,
  fallback = false
): boolean {
  const value =
    metadata[key];

  return typeof value ===
    "boolean"
    ? value
    : fallback;
}

function requiredString(
  metadata: Frontmatter,
  key: string,
  fileName: string
): string {
  const value =
    getString(
      metadata,
      key
    );

  if (!value) {
    throw new Error(
      `Falta "${key}" en ${fileName}`
    );
  }

  return value;
}

function normalizeAccent(
  value: string
): BlogAccent {
  if (
    value === "red" ||
    value === "yellow" ||
    value === "green"
  ) {
    return value;
  }

  return "red";
}

function parseMarkdownFile(
  fileName: string
): BlogPost {
  const fullPath =
    path.join(
      BLOG_DIRECTORY,
      fileName
    );

  const raw =
    fs.readFileSync(
      fullPath,
      "utf8"
    );

  const {
    metadata,
    content,
  } = parseFrontmatter(raw);

  const fileSlug =
    fileName.replace(
      /\.md$/,
      ""
    );

  const slug =
    getString(
      metadata,
      "slug"
    ) || fileSlug;

  const date =
    requiredString(
      metadata,
      "date",
      fileName
    );

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      date
    )
  ) {
    throw new Error(
      `La fecha de ${fileName} debe usar formato YYYY-MM-DD`
    );
  }

  return {
    slug,

    title:
      requiredString(
        metadata,
        "title",
        fileName
      ),

    // NUEVO:
    // Lee seoTitle desde el frontmatter.
    seoTitle:
      getString(
        metadata,
        "seoTitle"
      ) || undefined,

    category:
      requiredString(
        metadata,
        "category",
        fileName
      ),

    excerpt:
      requiredString(
        metadata,
        "excerpt",
        fileName
      ),

    readTime:
      getString(
        metadata,
        "readTime",
        "5 min de lectura"
      ),

    date,

    accent:
      normalizeAccent(
        getString(
          metadata,
          "accent",
          "red"
        )
      ),

    featured:
      getBoolean(
        metadata,
        "featured",
        false
      ),

    image:
      getString(
        metadata,
        "image"
      ) || undefined,

    imageAlt:
      getString(
        metadata,
        "imageAlt"
      ) || undefined,

    imageCaption:
      getString(
        metadata,
        "imageCaption"
      ) || undefined,

    tool:
      getString(
        metadata,
        "tool"
      ) || undefined,

    toolPath:
      getString(
        metadata,
        "toolPath"
      ) || undefined,

    content,
  };
}

export function getAllPosts():
  BlogPost[] {
  if (
    !fs.existsSync(
      BLOG_DIRECTORY
    )
  ) {
    return [];
  }

  return fs
    .readdirSync(
      BLOG_DIRECTORY
    )
    .filter(
      (fileName) =>
        fileName.endsWith(
          ".md"
        )
    )
    .map(
      parseMarkdownFile
    )
    .sort(
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
):
  | BlogPost
  | undefined {
  return getAllPosts().find(
    (post) =>
      post.slug === slug
  );
}

export function getFeaturedPost():
  | BlogPost
  | undefined {
  const posts =
    getAllPosts();

  return (
    posts.find(
      (post) =>
        post.featured
    ) ??
    posts[0]
  );
}

export function formatPostDate(
  date: string
): string {
  return new Intl
    .DateTimeFormat(
      "es-CL",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }
    )
    .format(
      new Date(
        `${date}T00:00:00Z`
      )
    );
}

export function categoryToSlug(
  category: string
): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}

export function getCategories():
  string[] {
  return Array.from(
    new Set(
      getAllPosts().map(
        (post) =>
          post.category
      )
    )
  ).sort(
    (a, b) =>
      a.localeCompare(
        b,
        "es"
      )
  );
}

export function getRelatedPosts(
  post: BlogPost,
  limit = 3
): BlogPost[] {
  const posts =
    getAllPosts().filter(
      (item) =>
        item.slug !==
        post.slug
    );

  const sameCategory =
    posts.filter(
      (item) =>
        item.category ===
        post.category
    );

  const otherPosts =
    posts.filter(
      (item) =>
        item.category !==
        post.category
    );

  return [
    ...sameCategory,
    ...otherPosts,
  ].slice(
    0,
    limit
  );
}