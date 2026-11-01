
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto | Calculadora de Asados",
  description:
    "Contacta con Calculadora de Asados para compartir consultas, sugerencias y comentarios.",
};

export default function Contacto() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <section className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-10">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300">
          ← Volver al inicio
        </Link>

        <h1 className="mt-8 text-4xl font-black">
          Contacto
        </h1>

        <p className="mt-6 leading-8 text-zinc-300">
          ¿Tienes una sugerencia para mejorar nuestra
          calculadora, una consulta sobre nuestros
          contenidos o una idea para una nueva guía?
        </p>

        <p className="mt-4 leading-8 text-zinc-300">
          Puedes contactarnos a través de nuestros
          canales oficiales.
        </p>

        <div className="mt-8 grid gap-4">
          <a
            href="https://www.instagram.com/asadointeligente_chile/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 font-bold text-white hover:border-red-500"
          >
            Instagram: @asadointeligente_chile
          </a>

          <a
            href="https://www.youtube.com/@AsadointeligenteChile"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 font-bold text-white hover:border-red-500"
          >
            YouTube: @AsadointeligenteChile
          </a>
        </div>
      </section>
    </main>
  );
}
