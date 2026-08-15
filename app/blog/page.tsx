import type { Metadata } from "next";
import Link from "next/link";

import ArticleCard from "../components/ArticleCard";
import BlogCta from "../components/BlogCta";
import SiteHeader from "../components/SiteHeader";

import {
  categoryToSlug,
  getAllPosts,
  getCategories,
} from "../lib/blog";

export const metadata: Metadata = {
  title:
    "Blog Parrillero | Calculadora de Asados",

  description:
    "Recetas, guías y consejos para calcular mejor las cantidades, organizar tu compra y preparar mejores asados.",

  alternates: {
    canonical:
      "https://calculadoradeasados.cl/blog",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{
    categoria?: string;
  }>;
}) {
  const params =
    await searchParams;

  const selectedCategory =
    params?.categoria ?? "todos";

  const posts = getAllPosts();

  const categories =
    getCategories();

  const filters = [
    {
      label: "Todos",
      value: "todos",
      href: "/blog",
    },

    ...categories.map(
      (category) => ({
        label: category,
        value:
          categoryToSlug(category),

        href:
          `/blog?categoria=${categoryToSlug(
            category
          )}`,
      })
    ),
  ];

  const filteredPosts =
    selectedCategory === "todos"
      ? posts
      : posts.filter(
          (post) =>
            categoryToSlug(
              post.category
            ) === selectedCategory
        );

  const activeFilter =
    filters.find(
      (filter) =>
        filter.value ===
        selectedCategory
    );

  const pageTitle =
    selectedCategory === "todos"
      ? "Blog Parrillero"
      : activeFilter?.label ??
        "Blog Parrillero";

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-400">
              Calculadora de Asados
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
              {pageTitle}
            </h1>

            <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
              Guías para utilizar
              nuestras herramientas,
              recetas para la parrilla y
              consejos para organizar
              mejor cantidades,
              presupuesto y compras.
            </p>
          </div>

          {/* FILTROS */}
          <div className="mt-8 flex flex-wrap gap-3">
            {filters.map(
              (filter) => {
                const isActive =
                  selectedCategory ===
                  filter.value;

                return (
                  <Link
                    key={filter.value}
                    href={filter.href}
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-2
                      text-sm
                      font-bold
                      transition
                      ${
                        isActive
                          ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-950/30"
                          : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-red-500/40 hover:text-red-300"
                      }
                    `}
                  >
                    {filter.label}
                  </Link>
                );
              }
            )}
          </div>

          {/* ARTÍCULOS */}
          {filteredPosts.length >
          0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(
                (post) => (
                  <ArticleCard
                    key={post.slug}
                    post={post}
                  />
                )
              )}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-black/35 p-10 text-center">
              <div className="text-5xl">
                🔥
              </div>

              <h2 className="mt-4 text-2xl font-black text-white">
                Todavía no hay
                artículos en esta
                categoría
              </h2>

              <p className="mt-3 text-sm text-zinc-400">
                Puedes volver al blog
                principal para revisar
                los demás artículos.
              </p>

              <Link
                href="/blog"
                className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-500"
              >
                Ver todos
              </Link>
            </div>
          )}

          <div className="mt-12">
            <BlogCta />
          </div>
        </section>
      </div>
    </main>
  );
}