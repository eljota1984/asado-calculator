import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Unificar dominio: www → sin www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.calculadoradeasados.cl",
          },
        ],
        destination: "https://calculadoradeasados.cl/:path*",
        permanent: true,
      },

      // URL antigua/incorrecta de tipos de carbón
      {
        source: "/blog/guia-tipos-de-carbon-for-asado",
        destination: "/blog/guia-tipos-de-carbon-para-asado",
        permanent: true,
      },

      // URL antigua incompleta de carne por persona
      {
        source: "/blog/cuanta-comprar-por-persona",
        destination: "/blog/cuanta-carne-comprar-por-persona",
        permanent: true,
      },

      // URL reciente de Pebre → recuperamos URL con historial SEO
      {
        source: "/blog/receta-pebre-chileno",
        destination: "/blog/pebre-chileno-para-asados",
        permanent: true,
      },

      // URL reciente de carne → recuperamos URL con historial SEO
      {
        source: "/blog/cuanta-carne-por-persona-para-un-asado",
        destination: "/blog/cuanta-carne-comprar-por-persona",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;