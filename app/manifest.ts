import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Calculadora de Asados",
    short_name: "Mi Asado",
    description:
      "Calcula cuánta carne necesitas, organiza tu compra y estima el presupuesto de tu asado.",
    lang: "es-CL",
    dir: "ltr",
    start_url: "/calculadora",
    scope: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#dc2626",
    orientation: "portrait",
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
