import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-800/80 px-4 py-4 md:px-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600/15 text-2xl ring-1 ring-red-500/40">
          🔥
        </div>

        <div className="leading-tight">
          <p className="text-sm font-black text-white">Calculadora</p>
          <p className="text-sm font-black text-white">de Asados</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-semibold text-zinc-300 md:flex">
        <Link href="/calculadora" className="transition hover:text-red-400">
          Calculadora
        </Link>

        <Link href="/blog" className="transition hover:text-red-400">
          Blog
        </Link>

        <Link
          href="/blog/chorizos-caseros-receta-paso-a-paso"
          className="transition hover:text-red-400"
        >
          Recetas
        </Link>

        <Link
          href="/blog/cuanta-carne-comprar-por-persona"
          className="transition hover:text-red-400"
        >
          Consejos
        </Link>
      </nav>

      <Link
        href="/calculadora"
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500"
      >
        Calcular mi asado
      </Link>
    </header>
  );
}