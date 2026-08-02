import { posts } from "./lib/posts";

const siteUrl = "https://www.calculadoradeasados.cl";;

export default function sitemap() {
  const staticRoutes = [
    "",
    "/calculadora",
    "/blog",
    "/blog?categoria=recetas",
    "/blog?categoria=consejos",
    "/blog?categoria=opiniones",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogPages = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPages];
}