import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import ArticleCard from "./components/ArticleCard";
import { posts } from "./lib/posts";

export const metadata = {
  title: "Calculadora de Asados | Calcula carne, costos y compra sugerida",
  description:
    "Calcula cuánta carne comprar para un asado, estima costos por persona y organiza tu compra con recetas y consejos parrilleros.",
};

export default function Home() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(234,179,8,0.12),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        <section className="grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-red-400">
              Planifica mejor tu parrilla
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Calcula tu asado sin quedarse{" "}
              <span className="text-yellow-400">corto</span> ni comprar{" "}
              <span className="text-yellow-400">de más</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
              Define kilos ideales según cantidad de personas, apetito y cortes.
              Además, estima costos y genera una compra sugerida para que solo
              te preocupes de disfrutar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/calculadora"
                className="rounded-2xl bg-red-600 px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
              >
                Calcular mi asado
              </Link>

              <Link
                href="/blog"
                className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-4 text-center text-sm font-black text-yellow-200 transition hover:bg-yellow-500/20"
              >
                Ver recetas
              </Link>
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center rounded-[2rem] border border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35),transparent_55%),linear-gradient(135deg,#18181b,#09090b)]">
            <Image
              src="/logo_final.png"
              alt="Calculadora de Asados"
              width={260}
              height={260}
              className="h-auto w-[260px] md:w-[340px] object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* <div className="relative flex min-h-[320px] items-center justify-center rounded-[2rem] border border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35),transparent_55%),linear-gradient(135deg,#18181b,#09090b)] text-[8rem]">
            🥩
          </div> */}
        </section>

        <section className="grid gap-5 px-6 pb-10 md:grid-cols-3 md:px-10">
          {featuredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}