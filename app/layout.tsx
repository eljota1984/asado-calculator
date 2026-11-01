
import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import PWAUpdateManager from "./components/PWAUpdateManager";
import PWAInstallBanner from "./components/PWAInstallBanner";

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
    capable: true,
    title: "Mi Asado",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
  },

  other: {
    "google-adsense-account": "ca-pub-1473477366060166",
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
      <body className="min-h-full flex flex-col">
        {/* Google AdSense - Verificación del sitio */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1473477366060166"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        <SerwistProvider swUrl="/sw.js">
          {children}

          <PWAInstallBanner />

          <PWAUpdateManager />

          <SiteFooter />
        </SerwistProvider>
      </body>
    </html>
  );
}
