import type {
  MetadataRoute,
} from "next";

import {
  getAllPosts,
} from "./lib/blog";

const siteUrl =
  "https://calculadoradeasados.cl";

export default function sitemap():
  MetadataRoute.Sitemap {
  const posts =
    getAllPosts();

  const staticPages:
    MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified:
        new Date(),
      changeFrequency:
        "weekly",
      priority: 1,
    },

    {
      url:
        `${siteUrl}/calculadora`,
      lastModified:
        new Date(),
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url:
        `${siteUrl}/blog`,
      lastModified:
        new Date(),
      changeFrequency:
        "weekly",
      priority: 0.8,
    },
  ];

  const blogPages:
    MetadataRoute.Sitemap =
    posts.map((post) => ({
      url:
        `${siteUrl}/blog/${post.slug}`,

      lastModified:
        new Date(
          `${post.date}T00:00:00Z`
        ),

      changeFrequency:
        "monthly" as const,

      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...blogPages,
  ];
}