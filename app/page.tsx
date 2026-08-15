import Image from "next/image";
import Link from "next/link";

import SiteHeader from "./components/SiteHeader";

import {
  formatPostDate,
  getAllPosts,
  getFeaturedPost,
  type BlogPost,
} from "./lib/blog";

export const metadata = {
  title:
    "Calculadora de Asados | Calcula carne, costos y compra sugerida",

  description:
    "Calcula cuánta carne comprar para un asado, estima costos por persona y organiza tu compra con recetas y consejos parrilleros.",
};

function SideArticle({
  post,
}: {
  post: BlogPost;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 transition hover:-translate-y-0.5 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20 sm:grid-cols-[150px_1fr] lg:grid-cols-[135px_1fr]"
    >
      <div className="relative min-h-[150px] overflow-hidden bg-zinc-900">
        {post.image ? (
          <Image
            src={post.image}
            alt={
              post.imageAlt ??
              post.title
            }
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-[150px] items-center justify-center text-4xl">
            🔥
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-col justify-center p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-400">
          {post.category}
        </p>

        <h3 className="mt-2 text-base font-black leading-snug text-white transition group-hover:text-red-300">
          {post.title}
        </h3>

        <p className="mt-3 text-xs text-zinc-500">
          {formatPostDate(
            post.date
          )}{" "}
          · {post.readTime}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  const posts = getAllPosts();

  const featured =
    getFeaturedPost();

  const sidePosts = posts
    .filter(
      (post) =>
        post.slug !==
        featured?.slug
    )
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(234,179,8,0.12),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        {/* HERO */}
        <section className="grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-red-400">
              Planifica mejor tu parrilla
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Calcula tu asado sin
              quedarte{" "}
              <span className="text-yellow-400">
                corto
              </span>{" "}
              ni comprar{" "}
              <span className="text-yellow-400">
                de más
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
              Define kilos ideales
              según cantidad de
              personas, apetito y
              cortes. Además, estima
              costos y genera una
              compra sugerida para que
              solo te preocupes de
              disfrutar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/calculadora"
                className="rounded-2xl bg-red-600 px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
              >
                Calcular mi asado
              </Link>

              <Link
                href="#blog"
                className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-4 text-center text-sm font-black text-yellow-200 transition hover:bg-yellow-500/20"
              >
                Ver artículos
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35),transparent_55%),linear-gradient(135deg,#18181b,#09090b)]">
            <div className="absolute h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />

            <Image
              src="/logo_final.png"
              alt="Calculadora de Asados"
              width={340}
              height={340}
              className="relative h-auto w-[260px] object-contain drop-shadow-2xl md:w-[340px]"
              priority
            />
          </div>
        </section>

        {/* BLOG */}
        {featured && (
          <section
            id="blog"
            className="border-t border-zinc-800/80 px-6 py-10 md:px-10 md:py-14"
          >
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-red-400">
                  Aprende antes de
                  encender la parrilla
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                  Guías y consejos
                  parrilleros
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                  Aprende a utilizar
                  nuestras herramientas,
                  calcular mejor tus
                  cantidades y organizar
                  tu próximo asado.
                </p>
              </div>

              <Link
                href="/blog"
                className="shrink-0 text-sm font-black text-yellow-300 transition hover:text-yellow-200"
              >
                Ver todos los artículos →
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
              {/* DESTACADO */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-black/30 transition hover:-translate-y-1 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/25"
              >
                <article>
                  <div className="relative aspect-[16/8.3] overflow-hidden bg-zinc-900">
                    {featured.image ? (
                      <Image
                        src={
                          featured.image
                        }
                        alt={
                          featured.imageAlt ??
                          featured.title
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-8xl">
                        🔥
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full border border-yellow-400/30 bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300 backdrop-blur-md">
                      Artículo destacado
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-black uppercase tracking-wider text-red-400">
                        {featured.category}
                      </span>

                      <span className="text-zinc-700">
                        •
                      </span>

                      <span className="text-zinc-500">
                        {formatPostDate(
                          featured.date
                        )}
                      </span>

                      <span className="text-zinc-700">
                        •
                      </span>

                      <span className="text-zinc-500">
                        {
                          featured.readTime
                        }
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight text-white transition group-hover:text-red-300 md:text-3xl">
                      {featured.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                      {featured.excerpt}
                    </p>

                    <p className="mt-6 text-sm font-black text-yellow-300 transition group-hover:translate-x-1">
                      Leer artículo →
                    </p>
                  </div>
                </article>
              </Link>

              {/* SECUNDARIOS */}
              <div className="flex flex-col gap-5">
                {sidePosts.map(
                  (post) => (
                    <SideArticle
                      key={post.slug}
                      post={post}
                    />
                  )
                )}

                <Link
                  href="/blog"
                  className="flex min-h-[90px] flex-1 items-center justify-center rounded-3xl border border-dashed border-red-500/30 bg-red-500/5 px-6 text-center text-sm font-black text-red-300 transition hover:border-red-500/60 hover:bg-red-500/10"
                >
                  Explorar recetas,
                  guías y consejos →
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}