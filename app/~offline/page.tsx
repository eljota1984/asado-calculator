export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl shadow-red-950/20">
        <div className="text-5xl">🔥</div>

        <h1 className="mt-5 text-3xl font-black">
          Sin conexión
        </h1>

        <p className="mt-4 leading-7 text-zinc-400">
          No pudimos cargar esta página desde internet.
        </p>

        <p className="mt-3 leading-7 text-zinc-400">
          La Calculadora de Asados puede seguir funcionando con las
          secciones que ya están disponibles en tu dispositivo.
        </p>

        <a
          href="/calculadora"
          className="mt-7 inline-flex rounded-2xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
        >
          Ir a la calculadora
        </a>
      </section>
    </main>
  );
}
