import Image from "next/image";
import Link from "next/link";

import {
  formatPostDate,
  type BlogPost,
} from "../lib/blog";

const accentClasses = {
  red: {
    badge:
      "border-red-500/30 bg-red-500/10 text-red-300",
    hover:
      "group-hover:border-red-500/50",
  },

  yellow: {
    badge:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
    hover:
      "group-hover:border-yellow-500/40",
  },

  green: {
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    hover:
      "group-hover:border-emerald-500/40",
  },
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategoryIcon(
  category: string
) {
  const normalized =
    normalizeText(category);

  if (normalized === "guias") {
    return "🧮";
  }

  if (normalized === "consejos") {
    return "💡";
  }

  if (normalized === "recetas") {
    return "👨‍🍳";
  }

  if (normalized === "opiniones") {
    return "📣";
  }

  return "🔥";
}

export default function ArticleCard({
  post,
}: {
  post: BlogPost;
}) {
  const accent =
    accentClasses[post.accent];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950/90
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-red-950/20
        ${accent.hover}
      `}
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
          {post.image ? (
            <Image
              src={post.image}
              alt={
                post.imageAlt ??
                post.title
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.38),transparent_55%),linear-gradient(135deg,#18181b,#09090b)] text-6xl">
              {getCategoryIcon(
                post.category
              )}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {post.featured && (
            <span className="absolute left-4 top-4 rounded-full border border-yellow-400/30 bg-black/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300 backdrop-blur">
              Destacado
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex
                rounded-full
                border
                px-3
                py-1
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                ${accent.badge}
              `}
            >
              {post.category}
            </span>

            <span className="text-xs text-zinc-600">
              {post.readTime}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-black leading-tight text-white transition group-hover:text-red-300">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="text-xs text-zinc-500">
              {formatPostDate(
                post.date
              )}
            </span>

            <span className="shrink-0 text-sm font-black text-red-400 transition group-hover:translate-x-1">
              Leer →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}