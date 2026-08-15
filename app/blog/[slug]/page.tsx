import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import ArticleCard from "../../components/ArticleCard";
import SiteHeader from "../../components/SiteHeader";

import {
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "../../lib/blog";

const siteUrl =
  "https://calculadoradeasados.cl";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map(
    (post) => ({
      slug: post.slug,
    })
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post =
    getPostBySlug(slug);

  if (!post) {
    return {
      title:
        "Artículo no encontrado | Calculadora de Asados",
    };
  }

  const canonicalUrl =
    `${siteUrl}/blog/${post.slug}`;

  return {
    title:
      `${post.title} | Calculadora de Asados`,

    description:
      post.excerpt,

    alternates: {
      canonical:
        canonicalUrl,
    },

    openGraph: {
      title:
        post.title,

      description:
        post.excerpt,

      url:
        canonicalUrl,

      siteName:
        "Calculadora de Asados",

      type:
        "article",

      publishedTime:
        `${post.date}T00:00:00.000Z`,

      images:
        post.image
          ? [
              {
                url:
                  `${siteUrl}${post.image}`,
                width: 1200,
                height: 675,
                alt:
                  post.imageAlt ??
                  post.title,
              },
            ]
          : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const post =
    getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts =
    getRelatedPosts(post, 3);

  const articleUrl =
    `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    headline:
      post.title,

    description:
      post.excerpt,

    datePublished:
      `${post.date}T00:00:00.000Z`,

    dateModified:
      `${post.date}T00:00:00.000Z`,

    author: {
      "@type":
        "Organization",

      name:
        "Calculadora de Asados",
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "Calculadora de Asados",

      url:
        siteUrl,
    },

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        articleUrl,
    },

    image:
      post.image
        ? `${siteUrl}${post.image}`
        : undefined,
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.10),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        <article className="mx-auto max-w-4xl px-6 py-10 md:px-10 md:py-14">
          {/* VOLVER */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-red-300"
          >
            ← Volver al blog
          </Link>

          {/* CABECERA */}
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-red-300">
                {post.category}
              </span>

              {post.featured && (
                <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                  Destacado
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
              <span>
                📅{" "}
                {formatPostDate(
                  post.date
                )}
              </span>

              <span>•</span>

              <span>
                ⏱ {post.readTime}
              </span>
            </div>
          </header>

          {/* HERO IMAGE */}
          {post.image && (
            <figure className="mt-9">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
                <Image
                  src={post.image}
                  alt={
                    post.imageAlt ??
                    post.title
                  }
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              {post.imageCaption && (
                <figcaption className="mt-3 text-center text-xs leading-5 text-zinc-500">
                  {
                    post.imageCaption
                  }
                </figcaption>
              )}
            </figure>
          )}

          {/* MARKDOWN */}
          <div className="mt-10 rounded-[2rem] border border-zinc-800 bg-black/30 px-6 py-8 shadow-xl shadow-black/20 md:px-10 md:py-10">
            <ReactMarkdown
              components={{
                h1: ({
                  children,
                }) => (
                  <h1 className="mb-5 mt-10 text-3xl font-black text-white first:mt-0">
                    {children}
                  </h1>
                ),

                h2: ({
                  children,
                }) => (
                  <h2 className="mb-4 mt-10 border-l-4 border-red-600 pl-4 text-2xl font-black leading-tight text-white first:mt-0 md:text-3xl">
                    {children}
                  </h2>
                ),

                h3: ({
                  children,
                }) => (
                  <h3 className="mb-3 mt-8 text-xl font-black text-white">
                    {children}
                  </h3>
                ),

                p: ({
                  children,
                }) => (
                  <p className="my-5 text-base leading-8 text-zinc-300 md:text-[17px]">
                    {children}
                  </p>
                ),

                ul: ({
                  children,
                }) => (
                  <ul className="my-6 space-y-3">
                    {children}
                  </ul>
                ),

                ol: ({
                  children,
                }) => (
                  <ol className="my-6 list-decimal space-y-3 pl-6 text-zinc-300">
                    {children}
                  </ol>
                ),

                li: ({
                  children,
                }) => (
                  <li className="flex gap-3 text-base leading-7 text-zinc-300">
                    <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-yellow-400" />

                    <span>
                      {children}
                    </span>
                  </li>
                ),

                strong: ({
                  children,
                }) => (
                  <strong className="font-black text-white">
                    {children}
                  </strong>
                ),

                em: ({
                  children,
                }) => (
                  <em className="text-zinc-200">
                    {children}
                  </em>
                ),

                blockquote: ({
                  children,
                }) => (
                  <blockquote className="my-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-5 text-zinc-200">
                    <div className="mb-2 text-2xl">
                      💡
                    </div>

                    {children}
                  </blockquote>
                ),

                a: ({
                  href = "",
                  children,
                }) => {
                  if (
                    href.startsWith("/")
                  ) {
                    return (
                      <Link
                        href={href}
                        className="font-black text-yellow-300 underline decoration-yellow-500/30 decoration-2 underline-offset-4 transition hover:text-yellow-200"
                      >
                        {children}
                      </Link>
                    );
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-yellow-300 underline decoration-yellow-500/30 decoration-2 underline-offset-4 transition hover:text-yellow-200"
                    >
                      {children}
                    </a>
                  );
                },

                hr: () => (
                  <hr className="my-10 border-zinc-800" />
                ),

                img: ({
                  src,
                  alt,
                  title,
                }) => {
                  if (
                    typeof src !==
                      "string" ||
                    !src
                  ) {
                    return null;
                  }

                  return (
                    <figure className="my-10">
                      <Image
                        src={src}
                        alt={alt ?? ""}
                        width={1200}
                        height={675}
                        className="h-auto w-full rounded-[2rem] border border-zinc-800 object-cover shadow-xl shadow-black/20"
                      />

                      {title && (
                        <figcaption className="mt-3 text-center text-xs text-zinc-500">
                          {title}
                        </figcaption>
                      )}
                    </figure>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA HERRAMIENTA */}
          {post.tool &&
            post.toolPath && (
              <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-red-950 via-zinc-950 to-black p-7 shadow-2xl shadow-red-950/20 md:p-10">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                    Pruébalo con tus datos
                  </p>

                  <h2 className="mt-3 max-w-xl text-2xl font-black text-white md:text-3xl">
                    Haz el cálculo para
                    tu próximo asado
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                    Ingresa tus
                    invitados, selecciona
                    tus carnes y obtén
                    una estimación para
                    planificar tu compra.
                  </p>

                  <Link
                    href={
                      post.toolPath
                    }
                    className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500"
                  >
                    {post.tool} →
                  </Link>
                </div>
              </section>
            )}
        </article>

        {/* RELACIONADOS */}
        {relatedPosts.length >
          0 && (
          <section className="border-t border-zinc-800 px-6 py-10 md:px-10 md:py-14">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400">
                  Sigue aprendiendo
                </p>

                <h2 className="mt-2 text-3xl font-black text-white">
                  También te puede
                  interesar
                </h2>
              </div>

              <Link
                href="/blog"
                className="hidden text-sm font-black text-yellow-300 transition hover:text-yellow-200 sm:block"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map(
                (relatedPost) => (
                  <ArticleCard
                    key={
                      relatedPost.slug
                    }
                    post={
                      relatedPost
                    }
                  />
                )
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}