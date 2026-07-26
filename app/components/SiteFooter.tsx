const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/tu_usuario",
    label: "IG",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/tu_pagina",
    label: "FB",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@tu_canal",
    label: "YT",
  },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-zinc-800 bg-black px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black text-white">
            Calculadora de Asados
          </p>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            © {currentYear} Calculadora de Asados. Todos los derechos
            reservados.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Síguenos
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-xs font-black text-zinc-300 transition hover:border-red-500/60 hover:bg-red-600 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}