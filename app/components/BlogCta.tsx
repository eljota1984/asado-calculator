import Link from "next/link";

export default function BlogCta() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-red-500/30 bg-gradient-to-r from-red-950/70 via-zinc-950 to-black p-6 shadow-xl shadow-red-950/20 md:p-8">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600/15 text-3xl ring-1 ring-red-500/40">
            🔥
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              ¿Preparando un asado?
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-400">
              Calcula cantidades,
              organiza los cortes y
              obtén una referencia para
              tu compra.
            </p>
          </div>
        </div>

        <Link
          href="/calculadora"
          className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500"
        >
          Calcular mi asado →
        </Link>
      </div>
    </section>
  );
}