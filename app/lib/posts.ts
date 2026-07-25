
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  accent: "red" | "yellow" | "green";
  content: {
    intro: string;
    sections: {
      title: string;
      body: string[];
    }[];
  };
};

export const posts: BlogPost[] = [
  {
    slug: "cuanta-carne-comprar-por-persona",
    title: "¿Cuánta carne comprar por persona para un asado?",
    category: "Consejos",
    excerpt:
      "Guía práctica para calcular los kilos ideales según apetito, cantidad de personas y tipo de asado.",
    readTime: "5 min de lectura",
    date: "10 de mayo, 2026",
    accent: "yellow",
    content: {
      intro:
        "Calcular bien la cantidad de carne es clave para que todos coman bien, no sobre demasiado y no falte nada.",
      sections: [
        {
          title: "Valores orientativos por persona",
          body: [
            "Apetito alto: 800 g a 900 g de carne cruda por adulto.",
            "Apetito normal: 500 g a 600 g de carne cruda por adulto.",
            "Apetito bajo: 350 g a 400 g de carne cruda por adulto.",
            "Niños: 200 g a 300 g de carne cruda aproximadamente.",
          ],
        },
      ],
    },
  },
  {
    slug: "cortes-economicos-para-parrilla",
    title: "Cortes económicos para parrilla",
    category: "Cortes",
    excerpt:
      "Opciones sabrosas y accesibles para disfrutar un buen asado sin romper el presupuesto.",
    readTime: "6 min de lectura",
    date: "12 de mayo, 2026",
    accent: "red",
    content: {
      intro:
        "Un buen asado no siempre necesita los cortes más caros. La clave está en elegir bien.",
      sections: [
        {
          title: "Cortes que pueden rendir bien",
          body: [
            "Sobrecostilla, huachalomo, asado carnicero y algunos cortes de cerdo pueden funcionar muy bien.",
            "El pollo y los embutidos ayudan a equilibrar el presupuesto del grupo.",
          ],
        },
      ],
    },
  },
  {
    slug: "chorizos-caseros-receta-paso-a-paso",
    title: "Chorizos caseros: receta paso a paso",
    category: "Recetas",
    excerpt:
      "Una idea simple para sumar embutidos sabrosos a la parrilla y variar el menú.",
    readTime: "7 min de lectura",
    date: "20 de mayo, 2026",
    accent: "green",
    content: {
      intro:
        "Los chorizos son clásicos del asado. Puedes usarlos como entrada o complemento.",
      sections: [
        {
          title: "Consejos de preparación",
          body: [
            "Cocínalos a fuego medio para evitar que se quemen por fuera.",
            "Evita pincharlos demasiado para no perder jugosidad.",
          ],
        },
      ],
    },
  },
];