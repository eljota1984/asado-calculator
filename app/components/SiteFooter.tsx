const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/asadointeligente_chile/",
    handle: "@asadointeligente_chile",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AsadointeligenteChile",
    handle: "@AsadointeligenteChile",
  },
];

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="5"
        ry="5"
      />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 7.5A4.5 4.5 0 0 1 7 3h10a4.5 4.5 0 0 1 4.5 4.5v9A4.5 4.5 0 0 1 17 21H7a4.5 4.5 0 0 1-4.5-4.5z" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return <InstagramIcon />;
  }

  if (name === "YouTube") {
    return <YouTubeIcon />;
  }

  return null;
}

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-zinc-800 bg-black px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Información del sitio */}
        <div>
          <p className="text-sm font-black text-white">
            Calculadora de Asados
          </p>

          <p className="mt-2 max-w-md text-xs leading-6 text-zinc-500">
            Calcula, aprende y disfruta. Guías, recetas,
            consejos y herramientas para preparar mejores asados.
          </p>

          <p className="mt-3 text-xs text-zinc-600">
            © {currentYear} Calculadora de Asados.
            Todos los derechos reservados.
          </p>
        </div>

        {/* Redes sociales */}
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
                rel="noopener noreferrer"
                aria-label={`Visitar Asado Inteligente en ${social.name}`}
                title={`Asado Inteligente en ${social.name}`}
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-zinc-800
                  bg-zinc-950
                  text-zinc-300
                  transition
                  duration-200
                  hover:-translate-y-1
                  hover:border-red-500/60
                  hover:bg-red-600
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-red-950/30
                "
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>

          {/* Nombres de usuario */}
          <div className="flex flex-col gap-1 text-xs md:items-end">
            {socialLinks.map((social) => (
              <a
                key={`${social.name}-handle`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-500 transition hover:text-red-400"
              >
                {social.name}: {social.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}