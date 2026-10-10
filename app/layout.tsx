import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#dc2626",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://calculadoradeasados.cl"
  ),

  title: "Calculadora de Asados",

  description:
    "Calcula cantidades de carne, costos y compras para tu asado. Encuentra además recetas, guías y consejos parrilleros.",

  applicationName: "Calculadora de Asados",

  appleWebApp: {
    title: "Mi Asado",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children} <SiteFooter /></body>
    </html>
  );
}
