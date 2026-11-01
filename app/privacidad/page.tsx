
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad | Calculadora de Asados",
  description:
    "Información sobre privacidad, almacenamiento local, cookies y publicidad en Calculadora de Asados.",
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <article className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-10">
        <Link
          href="/"
          className="text-sm text-red-400 hover:text-red-300"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mt-8 text-4xl font-black">
          Política de privacidad
        </h1>

        <p className="mt-4 text-sm text-zinc-500">
          Última actualización: 1 de noviembre de 2026
        </p>

        <div className="mt-8 space-y-7 leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-red-400">
              1. Introducción
            </h2>
            <p className="mt-3">
              En Calculadora de Asados respetamos la
              privacidad de quienes visitan nuestro sitio.
              Esta política explica el funcionamiento
              de nuestra herramienta y el uso de
              tecnologías de almacenamiento y publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              2. Funcionamiento de la calculadora
            </h2>
            <p className="mt-3">
              La calculadora permite introducir cantidades
              de personas, productos y preferencias para
              obtener estimaciones de compra.
              Algunas configuraciones pueden guardarse
              en el almacenamiento local del navegador
              para facilitar su recuperación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              3. Cookies y tecnologías similares
            </h2>
            <p className="mt-3">
              El sitio puede utilizar almacenamiento local,
              cookies y tecnologías similares para
              funciones técnicas, preferencias y servicios
              de terceros integrados.
            </p>
            <p className="mt-3">
              Puedes administrar o eliminar cookies
              y datos almacenados desde la configuración
              de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              4. Google AdSense
            </h2>
            <p className="mt-3">
              Calculadora de Asados se encuentra en
              proceso de incorporación a Google AdSense,
              un servicio publicitario de Google.
            </p>
            <p className="mt-3">
              Cuando se habiliten los anuncios, Google
              y sus socios podrán utilizar cookies
              u otras tecnologías para mostrar,
              medir y gestionar publicidad, según
              las configuraciones aplicables.
            </p>
            <p className="mt-3">
              Puedes consultar cómo utiliza Google
              los datos de los sitios que usan sus
              servicios y administrar tus preferencias
              publicitarias en los siguientes enlaces:
            </p>
            <div className="mt-3 space-y-2">
              <a
                className="block text-yellow-300 underline"
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                Uso de datos por Google
              </a>
              <a
                className="block text-yellow-300 underline"
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Centro de anuncios de Google
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              5. Servicios externos
            </h2>
            <p className="mt-3">
              Algunos enlaces pueden dirigir a plataformas
              externas, como Instagram o YouTube.
              Esas plataformas tienen sus propias
              políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              6. Cambios en esta política
            </h2>
            <p className="mt-3">
              Esta política puede actualizarse cuando
              cambien las funcionalidades del sitio,
              los servicios utilizados o las
              obligaciones aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400">
              7. Contacto
            </h2>
            <p className="mt-3">
              Para realizar consultas relacionadas
              con el sitio y su política de privacidad,
              visita nuestra página de contacto.
            </p>
            <Link
              href="/contacto"
              className="mt-4 inline-block font-bold text-yellow-300 underline"
            >
              Ir a contacto
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
