import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import BlogCta from "../../components/BlogCta";
import { posts } from "../../lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.12),transparent_30%)]" />

      <article className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/85 shadow-2xl shadow-red-950/20">
        <SiteHeader />

        <div className="grid gap-8 px-6 py-10 md:grid-cols-[1fr_320px] md:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
              {post.category}
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm text-zinc-500">
              ⏱ {post.readTime} · 📅 {post.date}
            </p>

            <p className="mt-6 text-base leading-8 text-zinc-300">
              {post.content.intro}
            </p>

            <div className="my-8 rounded-[2rem] border border-yellow-500/30 bg-yellow-500/10 p-6">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Calcula tu asado con estos datos
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Usa la calculadora y obtén kilos ideales, costos y compra
                    sugerida para tu grupo.
                  </p>
                </div>

                <Link
                  href="/calculadora"
                  className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
                >
                  Usar calculadora →
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              {post.content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-black text-white">
                    {section.title}
                  </h2>

                  <ul className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <li
                        key={paragraph}
                        className="flex gap-3 text-sm leading-7 text-zinc-300"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-10">
              <BlogCta />
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] border border-zinc-800 bg-black/35 p-5">
            <h2 className="text-lg font-black text-white">
              Artículos relacionados
            </h2>

            <div className="mt-5 space-y-4">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-red-500/40"
                >
                  <p className="text-xs font-black uppercase tracking-widest text-red-400">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm font-black text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {item.readTime}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-5 block rounded-2xl border border-zinc-700 px-4 py-3 text-center text-sm font-black text-zinc-200 transition hover:border-red-500/40 hover:text-red-300"
            >
              Ver más artículos →
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}