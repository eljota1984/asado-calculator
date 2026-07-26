import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import ArticleCard from "../components/ArticleCard";
import BlogCta from "../components/BlogCta";
import { posts } from "../lib/posts";

export const metadata = {
  title: "Blog Parrillero | Recetas, consejos y opiniones para asados",
  description:
    "Lee recetas, consejos parrilleros, opiniones y guías para organizar mejores asados y calcular mejor tu compra.",
};

const categoryFilters = [
  {
    label: "Todos",
    value: "todos",
    href: "/blog",
  },
  {
    label: "Recetas",
    value: "recetas",
    href: "/blog?categoria=recetas",
  },
  {
    label: "Consejos",
    value: "consejos",
    href: "/blog?categoria=consejos",
  },
  {
    label: "Opiniones",
    value: "opiniones",
    href: "/blog?categoria=opiniones",
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params?.categoria ?? "todos";

  const filteredPosts =
    selectedCategory === "todos"
      ? posts
      : posts.filter(
          (post) => normalizeText(post.category) === selectedCategory
        );

  const pageTitle =
    selectedCategory === "todos"
      ? "Blog Parrillero"
      : categoryFilters.find((filter) => filter.value === selectedCategory)
          ?.label ?? "Blog Parrillero";

  const pageDescription =
    selectedCategory === "todos"
      ? "Recetas, consejos, opiniones y datos útiles para que tu asado sea más organizado, sabroso y sin compras al ojo."
      : `Artículos de ${pageTitle.toLowerCase()} para mejorar tus asados, planificar mejor y disfrutar más la parrilla.`;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.20),transparent_35%)]" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        <section className="px-6 py-10 md:px-10">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            {pageTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
            {pageDescription}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {categoryFilters.map((filter) => {
              const isActive =
                selectedCategory === filter.value ||
                (selectedCategory === "todos" && filter.value === "todos");

              return (
                <Link
                  key={filter.value}
                  href={filter.href}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-red-500/40 hover:text-red-300"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {filteredPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-zinc-800 bg-black/35 p-8 text-center">
              <h2 className="text-2xl font-black text-white">
                Todavía no hay artículos en esta categoría
              </h2>

              <p className="mt-3 text-sm text-zinc-400">
                Agrega nuevos artículos en app/lib/posts.ts usando esta
                categoría.
              </p>
            </div>
          )}

          <div className="mt-8">
            <BlogCta />
          </div>
        </section>
      </div>
    </main>
  );
}