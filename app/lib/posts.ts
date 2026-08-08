
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image?: string;
  imageAlt?: string;
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
    image: "/blog/carne-por-persona.jpg",
    imageAlt: "Porciones de carne organizadas para calcular un asado por persona",
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
    category: "Consejos",
    excerpt:
      "Opciones sabrosas y accesibles para disfrutar un buen asado sin romper el presupuesto.",
    readTime: "6 min de lectura",
    date: "12 de mayo, 2026",
    accent: "red",
    image: "/blog/cortes-economicos.jpg",
    imageAlt: "Cortes económicos de carne listos para preparar a la parrilla",
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
    image: "/blog/chorizos-caseros.jpg",
    imageAlt: "Chorizos caseros dorándose sobre una parrilla",
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
  {
    slug: "pebre-chileno-para-asados",
    title: "Pebre chileno para asados: receta simple y sabrosa",
    category: "Recetas",
    excerpt:
      "Una receta clásica de pebre chileno para acompañar carnes, choripanes, pan amasado y todo tipo de asados.",
    readTime: "5 min de lectura",
    date: "25 de julio, 2026",
    accent: "green",
    image: "/blog/pebre-chileno.jpg",
    imageAlt: "Pebre chileno fresco servido como acompañamiento para un asado",
    content: {
      intro: `El pebre es uno de los acompañamientos más queridos en los asados chilenos. Es fresco, sencillo, económico y tiene esa mezcla perfecta entre tomate, cilantro, cebolla, ají y limón que levanta cualquier carne a la parrilla. Además, funciona muy bien con choripanes, pan amasado, sopaipillas, papas cocidas o incluso con verduras asadas.`,
      sections: [
        {
          title: "Ingredientes",
          body: [
            `2 tomates medianos picados en cubitos pequeños.`,
            `1 cebolla pequeña o media cebolla grande picada fina.`,
            `1 taza de cilantro fresco picado.`,
            `1 ají verde picado fino o merkén a gusto.`,
            `Jugo de 1 limón o un chorrito de vinagre.`,
            `2 cucharadas de aceite.`,
            `Sal y pimienta a gusto.`,
          ],
        },
        {
          title: "Preparación paso a paso",
          body: [
            `Primero lava muy bien los tomates, el cilantro y el ají. Luego pica todo en trozos pequeños para que el pebre tenga una textura pareja y sea fácil de servir sobre el pan o la carne.`,
            `En un bowl mezcla el tomate, la cebolla, el cilantro y el ají. Agrega el jugo de limón o vinagre, el aceite, la sal y la pimienta. Revuelve bien para que todos los ingredientes se integren.`,
            `Deja reposar el pebre al menos 15 minutos antes de servir. Ese tiempo permite que los sabores se mezclen mejor y que la cebolla pierda un poco de intensidad.`,
          ],
        },
        {
          title: "Consejos parrilleros",
          body: [
            `Si quieres un pebre más suave, puedes lavar la cebolla picada con agua fría y escurrirla antes de mezclarla con el resto de los ingredientes.`,
            `Si buscas un sabor más intenso, agrega merkén, ajo picado fino o un toque de ají cacho de cabra.`,
            `Para un asado grande, prepara el pebre con anticipación y mantenlo refrigerado hasta el momento de servir. Es simple, rendidor y casi siempre desaparece antes que la carne.`,
          ],
        },
      ],
    },
  },
  {
    slug: "provoleta-a-la-parrilla",
    title: "Provoleta a la parrilla: entrada fácil para comenzar el asado",
    category: "Recetas",
    excerpt:
      "Una preparación simple y deliciosa para servir queso caliente, dorado y fundido antes de las carnes principales.",
    readTime: "6 min de lectura",
    date: "25 de julio, 2026",
    accent: "yellow",
    image: "/blog/provoleta-parrilla.jpg",
    imageAlt: "Provoleta derretida y dorada preparada a la parrilla",
    content: {
      intro: `La provoleta a la parrilla es una entrada perfecta para abrir el apetito mientras las brasas toman fuerza. Es sencilla, sabrosa y tiene ese efecto mágico del queso derretido que siempre reúne a todos alrededor de la parrilla. Aunque parece una receta fácil, tiene algunos detalles importantes para evitar que el queso se desarme o se pegue.`,
      sections: [
        {
          title: "Ingredientes",
          body: [
            `1 pieza de queso provoleta o queso apto para parrilla.`,
            `Orégano seco a gusto.`,
            `Merkén o ají molido a gusto.`,
            `Aceite de oliva o aceite común.`,
            `Pimienta a gusto.`,
            `Opcional: tomates cherry, albahaca o un toque de miel para una versión diferente.`,
          ],
        },
        {
          title: "Preparación paso a paso",
          body: [
            `Antes de poner la provoleta en la parrilla, sécala bien con papel absorbente. Esto ayuda a que se dore mejor y reduce el riesgo de que se pegue.`,
            `Unta ligeramente la superficie con aceite y agrega orégano, pimienta y merkén. No es necesario usar demasiados condimentos, porque el queso ya tiene bastante sabor.`,
            `Pon la provoleta sobre una plancha, sartén de fierro, fuente apta para parrilla o papel aluminio resistente. Evita ponerla directamente sobre la rejilla si no tienes experiencia, porque puede derretirse demasiado rápido y caer sobre las brasas.`,
            `Cocina a fuego medio hasta que el queso esté caliente, blando y dorado en la superficie. Sirve inmediatamente con pan, tostadas o verduras asadas.`,
          ],
        },
        {
          title: "Consejos para que no se rompa",
          body: [
            `No uses fuego demasiado fuerte. La provoleta necesita calor controlado para fundirse sin quemarse.`,
            `Si la pieza es muy delgada, puede derretirse demasiado rápido. Conviene usar una porción gruesa o cocinarla en recipiente.`,
            `Sirve apenas esté lista. La gracia de la provoleta está en comerla caliente, cuando aún está suave y fundida.`,
          ],
        },
      ],
    },
  },
  {
    slug: "malaya-a-la-pizza-a-la-parrilla",
    title: "Malaya a la pizza: receta parrillera para sorprender",
    category: "Recetas",
    excerpt:
      "Una forma sabrosa y distinta de preparar malaya a la parrilla con salsa de tomate, queso y toppings estilo pizza.",
    readTime: "8 min de lectura",
    date: "25 de julio, 2026",
    accent: "red",
    image: "/blog/malaya-pizza.jpg",
    imageAlt: "Malaya a la pizza preparada a la parrilla con queso y salsa de tomate",
    content: {
      intro: `La malaya a la pizza es una preparación ideal para quienes quieren salir del asado tradicional sin complicarse demasiado. La malaya es un corte sabroso, delgado y versátil, que se adapta muy bien a preparaciones rellenas o cubiertas. Al combinarla con salsa de tomate, queso y condimentos, se transforma en una receta llamativa, rendidora y perfecta para compartir.`,
      sections: [
        {
          title: "Ingredientes",
          body: [
            `1 malaya limpia y extendida.`,
            `Sal gruesa o sal fina a gusto.`,
            `Pimienta a gusto.`,
            `Salsa de tomate o salsa para pizza.`,
            `Queso mantecoso, mozzarella o el queso que prefieras.`,
            `Orégano seco.`,
            `Jamón, tomate, aceitunas, pimentón, cebolla o champiñones a gusto.`,
            `Opcional: merkén, ajo en polvo o ají para darle más carácter.`,
          ],
        },
        {
          title: "Preparación paso a paso",
          body: [
            `Primero limpia la malaya retirando excesos de grasa muy gruesa, pero sin dejarla completamente seca. Un poco de grasa ayuda a mantener sabor y jugosidad durante la cocción.`,
            `Condimenta la carne con sal y pimienta por ambos lados. Luego ponla sobre la parrilla a fuego medio, primero por el lado que tenga más grasa. Cocínala hasta que comience a dorarse y tomar buen color.`,
            `Cuando la malaya esté casi lista, agrega encima una capa de salsa de tomate, queso y los toppings elegidos. La idea es que la carne funcione como base, similar a una pizza parrillera.`,
            `Cubre con una tapa metálica, fuente invertida o papel aluminio sin tocar directamente el queso. Esto ayuda a concentrar el calor para que el queso se derrita sin tener que quemar la carne por abajo.`,
          ],
        },
        {
          title: "Consejos para un mejor resultado",
          body: [
            `No pongas la salsa y el queso desde el comienzo, porque la carne necesita dorarse primero. Si agregas todo demasiado temprano, la malaya puede soltar mucho líquido y perder textura.`,
            `Usa fuego medio y paciencia. La malaya es delgada, por lo que puede pasarse rápidamente si la dejas demasiado tiempo sobre brasas muy fuertes.`,
            `Para servir, corta en tiras o cuadrados pequeños. Es una receta ideal para compartir como entrada potente o como parte de una tabla parrillera.`,
          ],
        },
      ],
    },
  },
  {
    slug: "cuanto-carbon-comprar-para-un-asado",
    title: "Cuánto carbón comprar para un asado",
    category: "Consejos",
    excerpt:
      "Una guía práctica para calcular la cantidad de carbón según personas, duración del asado y tipo de preparación.",
    readTime: "6 min de lectura",
    date: "25 de julio, 2026",
    accent: "yellow",
    image: "/blog/carbon-asado.jpg",
    imageAlt: "Carbón encendido con brasas listas para preparar un asado",
    content: {
      intro: `Calcular cuánto carbón comprar es una de las dudas más comunes antes de un asado. Comprar poco puede arruinar la jornada, porque quedarse sin brasas a mitad de cocción es un problema serio. Comprar demasiado no es tan grave, pero puede aumentar el costo y dejar bolsas abiertas sin necesidad. La clave está en considerar cuántas personas comerán, cuánto tiempo estará encendida la parrilla y qué tipo de carne se va a preparar.`,
      sections: [
        {
          title: "Regla simple para calcular carbón",
          body: [
            `Para un asado pequeño de 4 a 6 personas, una bolsa de 2,5 kg a 3 kg puede ser suficiente si se cocinarán cortes rápidos, embutidos o pollo.`,
            `Para un asado mediano de 8 a 12 personas, conviene considerar entre 4 kg y 6 kg de carbón, especialmente si habrá varios cortes y la parrilla estará encendida por más tiempo.`,
            `Para un asado grande de 15 a 20 personas, lo más prudente es tener entre 8 kg y 10 kg de carbón, más una reserva adicional si se harán cortes lentos o una segunda tanda de carne.`,
          ],
        },
        {
          title: "Factores que cambian la cantidad",
          body: [
            `No todos los asados consumen el mismo carbón. Si vas a preparar cortes gruesos, costillar, malaya, pollo entero o carnes que requieren más tiempo, necesitarás más brasas.`,
            `También influye el clima. En días fríos, con viento o en lugares abiertos, el carbón puede consumirse más rápido porque cuesta mantener una temperatura estable.`,
            `El tipo de parrilla también importa. Una parrilla grande requiere más carbón para cubrir bien la superficie, mientras que una parrilla pequeña permite concentrar mejor el calor.`,
          ],
        },
        {
          title: "Consejo práctico",
          body: [
            `Siempre es mejor tener una pequeña reserva de carbón sin abrir. Si no la usas, queda para el próximo asado. En cambio, si falta carbón, no hay mucha solución rápida.`,
            `Una buena recomendación es calcular lo necesario y sumar un margen de seguridad de una bolsa pequeña, especialmente cuando hay invitados o cuando el asado será largo.`,
          ],
        },
      ],
    },
  },
  {
    slug: "diferencias-entre-carbones-en-chile",
    title: "Diferencias entre carbones en Chile: cuál elegir para tu asado",
    category: "Consejos",
    excerpt:
      "Una explicación simple sobre los tipos de carbón más comunes y cómo elegir según duración, calor, humo y tipo de asado.",
    readTime: "7 min de lectura",
    date: "25 de julio, 2026",
    accent: "green",
    image: "/blog/carbones-chile.jpg",
    imageAlt: "Diferentes tipos de carbón usados para asados en Chile",
    content: {
      intro: `En Chile es común encontrar distintos tipos de carbón para asado, y aunque a simple vista parezcan similares, no todos funcionan igual. Algunos prenden rápido pero duran poco, otros generan brasas más firmes y algunos pueden producir más humo o chispas. Elegir bien el carbón ayuda a controlar mejor la cocción, evitar frustraciones y lograr carnes mejor preparadas.`,
      sections: [
        {
          title: "Carbón vegetal tradicional",
          body: [
            `Es el carbón más común para asados caseros. Suele venir en trozos irregulares y puede variar bastante en tamaño y calidad según la marca o el origen.`,
            `Cuando es de buena calidad, prende relativamente bien, genera buenas brasas y entrega un sabor clásico a parrilla. Sin embargo, si viene con mucho polvo, piedras o trozos demasiado pequeños, puede rendir menos.`,
            `Es una buena opción para asados familiares, choripanes, cortes rápidos, pollo, cerdo y preparaciones de duración media.`,
          ],
        },
        {
          title: "Briquetas",
          body: [
            `Las briquetas son piezas compactadas que suelen tener forma más pareja. Su ventaja principal es que entregan calor más estable y pueden durar más tiempo que algunos carbones tradicionales.`,
            `Son útiles cuando se busca una cocción más pareja o cuando el asado necesita mantener temperatura durante más tiempo. También pueden ser prácticas para parrillas con tapa o preparaciones indirectas.`,
            `Como desventaja, algunas personas sienten que entregan menos aroma tradicional que el carbón vegetal. También es importante elegir briquetas de buena calidad para evitar olores extraños.`,
          ],
        },
        {
          title: "Qué mirar antes de comprar",
          body: [
            `Revisa que la bolsa no tenga demasiado polvo. Mucho polvo significa menos trozos útiles y menor rendimiento.`,
            `Prefiere carbón con trozos medianos y firmes. Si son demasiado pequeños, se consumen rápido; si son excesivamente grandes, pueden costar más en prender.`,
            `Si harás un asado largo, considera carbón de mejor rendimiento o mezcla carbón tradicional con briquetas. Para asados rápidos, un carbón vegetal común de buena calidad puede ser suficiente.`,
          ],
        },
      ],
    },
  },
  {
    slug: "como-elegir-la-carne-para-un-asado",
    title: "Cómo elegir la carne para un asado",
    category: "Consejos",
    excerpt:
      "Consejos simples para elegir carne considerando tipo de corte, grasa, cantidad de personas, presupuesto y forma de cocción.",
    readTime: "8 min de lectura",
    date: "25 de julio, 2026",
    accent: "red",
    image: "/blog/elegir-carne.jpg",
    imageAlt: "Cortes de carne frescos para elegir antes de preparar un asado",
    content: {
      intro: `Elegir la carne correcta puede marcar la diferencia entre un asado común y uno memorable. No se trata solamente de comprar el corte más caro, sino de escoger según el tipo de invitados, el presupuesto, el tiempo disponible y la forma de cocción. Una buena elección permite equilibrar sabor, rendimiento y costo.`,
      sections: [
        {
          title: "Define primero el tipo de asado",
          body: [
            `Antes de elegir cortes, piensa qué tipo de asado quieres hacer. No es lo mismo una reunión rápida con choripanes y cortes delgados que un asado largo con costillar, malaya, pollo y cortes gruesos.`,
            `Si tienes poco tiempo, conviene elegir cortes de cocción más rápida. Si tienes una tarde completa, puedes incluir carnes que necesiten más paciencia y fuego controlado.`,
            `También considera si habrá niños, personas que comen poco o invitados con preferencias distintas. En esos casos, conviene tener variedad y no depender de un solo tipo de carne.`,
          ],
        },
        {
          title: "Mira la grasa y el color",
          body: [
            `Una buena carne para asado suele tener color atractivo, textura firme y grasa visible pero equilibrada. La grasa aporta sabor y jugosidad, pero en exceso puede generar llamaradas o pérdida de rendimiento.`,
            `En cortes de vacuno, busca una carne de color rojo vivo o rojo cereza, evitando piezas opacas, con mal olor o con exceso de líquido en el envase.`,
            `En pollo y cerdo, revisa que la carne tenga buen color, olor fresco y que se mantenga refrigerada correctamente hasta el momento de cocinar.`,
          ],
        },
        {
          title: "Equilibra cortes premium y cortes rendidores",
          body: [
            `Una estrategia inteligente es combinar un corte principal con opciones más rendidoras. Por ejemplo, puedes incluir un buen corte de vacuno y complementar con cerdo, pollo o embutidos.`,
            `Esto permite controlar mejor el costo total del asado sin sacrificar variedad. Además, no todos los invitados comen lo mismo, por lo que tener distintas opciones suele funcionar mejor.`,
            `El mejor asado no siempre es el más caro. Muchas veces es el que está mejor planificado, mejor calculado y mejor cocinado.`,
          ],
        },
        {
          title: "Compra pensando en la parrilla, no solo en el precio",
          body: [
            `Un corte barato no siempre es conveniente si tiene mucho desperdicio, hueso o grasa que no se consumirá. Del mismo modo, un corte caro puede rendir bien si se aprovecha completo y se cocina correctamente.`,
            `Piensa en cuánto se va a comer realmente, cuánto tiempo tendrás para cocinar y qué acompañamientos habrá. Esa combinación ayuda a elegir mejor y evitar compras impulsivas.`,
            `Si tienes dudas, una buena calculadora de asados puede ayudarte a estimar kilos, costos y compra sugerida antes de ir a comprar.`,
          ],
        },
      ],
    },
  },
];
// export type BlogPost = {
//   slug: string;
//   title: string;
//   category: string;
//   excerpt: string;
//   readTime: string;
//   date: string;
//   image?: string;
//   imageAlt?: string;
//   accent: "red" | "yellow" | "green";
//   content: {
//     intro: string;
//     sections: {
//       title: string;
//       body: string[];
//     }[];
//   };
// };

// export const posts: BlogPost[] = [
//   {
//     slug: "cuanta-carne-comprar-por-persona",
//     title: "¿Cuánta carne comprar por persona para un asado?",
//     category: "Consejos",
//     excerpt:
//       "Guía práctica para calcular los kilos ideales según apetito, cantidad de personas y tipo de asado.",
//     readTime: "5 min de lectura",
//     date: "10 de mayo, 2026",
//     accent: "yellow",
//     // Cuánta carne comprar por persona
//     image: "/blog/carne-por-persona.jpg",
//     imageAlt: "Porciones de carne organizadas para calcular un asado por persona",
//     content: {
//       intro:
//         "Calcular bien la cantidad de carne es clave para que todos coman bien, no sobre demasiado y no falte nada.",
//       sections: [
//         {
//           title: "Valores orientativos por persona",
//           body: [
//             "Apetito alto: 800 g a 900 g de carne cruda por adulto.",
//             "Apetito normal: 500 g a 600 g de carne cruda por adulto.",
//             "Apetito bajo: 350 g a 400 g de carne cruda por adulto.",
//             "Niños: 200 g a 300 g de carne cruda aproximadamente.",
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "cortes-economicos-para-parrilla",
//     title: "Cortes económicos para parrilla",
//     category: "Cortes",
//     excerpt:
//       "Opciones sabrosas y accesibles para disfrutar un buen asado sin romper el presupuesto.",
//     readTime: "6 min de lectura",
//     date: "12 de mayo, 2026",
//     accent: "red",
//     // Cortes económicos
//     image: "/blog/cortes-economicos.jpg",
//     imageAlt: "Cortes económicos de carne listos para preparar a la parrilla",
//     content: {
//       intro:
//         "Un buen asado no siempre necesita los cortes más caros. La clave está en elegir bien.",
//       sections: [
//         {
//           title: "Cortes que pueden rendir bien",
//           body: [
//             "Sobrecostilla, huachalomo, asado carnicero y algunos cortes de cerdo pueden funcionar muy bien.",
//             "El pollo y los embutidos ayudan a equilibrar el presupuesto del grupo.",
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "chorizos-caseros-receta-paso-a-paso",
//     title: "Chorizos caseros: receta paso a paso",
//     category: "Recetas",
//     excerpt:
//       "Una idea simple para sumar embutidos sabrosos a la parrilla y variar el menú.",
//     readTime: "7 min de lectura",
//     date: "20 de mayo, 2026",
//     accent: "green",
//     // Chorizos caseros
//     image: "/blog/chorizos-caseros.jpg",
//     imageAlt: "Chorizos caseros dorándose sobre una parrilla",
//     content: {
//       intro:
//         "Los chorizos son clásicos del asado. Puedes usarlos como entrada o complemento.",
//       sections: [
//         {
//           title: "Consejos de preparación",
//           body: [
//             "Cocínalos a fuego medio para evitar que se quemen por fuera.",
//             "Evita pincharlos demasiado para no perder jugosidad.",
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "pebre-chileno-para-asados",
//     title: "Pebre chileno para asados: receta simple y sabrosa",
//     category: "Recetas",
//     excerpt:
//       "Una receta clásica de pebre chileno para acompañar carnes, choripanes, pan amasado y todo tipo de asados.",
//     readTime: "5 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "green",
//     // Pebre chileno
//     image: "/blog/pebre-chileno.jpg",
//     imageAlt: "Pebre chileno fresco servido como acompañamiento para un asado",
//     content: {
//       intro: `El pebre es uno de los acompañamientos más queridos en los asados chilenos. Es fresco, sencillo, económico y tiene esa mezcla perfecta entre tomate, cilantro, cebolla, ají y limón que levanta cualquier carne a la parrilla. Además, funciona muy bien con choripanes, pan amasado, sopaipillas, papas cocidas o incluso con verduras asadas.`,

//       sections: [
//         {
//           title: "Ingredientes",
//           body: [
//             `2 tomates medianos picados en cubitos pequeños.`,
//             `1 cebolla pequeña o media cebolla grande picada fina.`,
//             `1 taza de cilantro fresco picado.`,
//             `1 ají verde picado fino o merkén a gusto.`,
//             `Jugo de 1 limón o un chorrito de vinagre.`,
//             `2 cucharadas de aceite.`,
//             `Sal y pimienta a gusto.`,
//           ],
//         },
//         {
//           title: "Preparación paso a paso",
//           body: [
//             `Primero lava muy bien los tomates, el cilantro y el ají. Luego pica todo en trozos pequeños para que el pebre tenga una textura pareja y sea fácil de servir sobre el pan o la carne.`,
//             `En un bowl mezcla el tomate, la cebolla, el cilantro y el ají. Agrega el jugo de limón o vinagre, el aceite, la sal y la pimienta. Revuelve bien para que todos los ingredientes se integren.`,
//             `Deja reposar el pebre al menos 15 minutos antes de servir. Ese tiempo permite que los sabores se mezclen mejor y que la cebolla pierda un poco de intensidad.`,
//           ],
//         },
//         {
//           title: "Consejos parrilleros",
//           body: [
//             `Si quieres un pebre más suave, puedes lavar la cebolla picada con agua fría y escurrirla antes de mezclarla con el resto de los ingredientes.`,
//             `Si buscas un sabor más intenso, agrega merkén, ajo picado fino o un toque de ají cacho de cabra.`,
//             `Para un asado grande, prepara el pebre con anticipación y mantenlo refrigerado hasta el momento de servir. Es simple, rendidor y casi siempre desaparece antes que la carne.`,
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "provoleta-a-la-parrilla",
//     title: "Provoleta a la parrilla: entrada fácil para comenzar el asado",
//     category: "Recetas",
//     excerpt:
//       "Una preparación simple y deliciosa para servir queso caliente, dorado y fundido antes de las carnes principales.",
//     readTime: "6 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "yellow",
//     // Provoleta
//     image: "/blog/provoleta-parrilla.jpg",
//     imageAlt: "Provoleta derretida y dorada preparada a la parrilla",
//     content: {
//       intro: `La provoleta a la parrilla es una entrada perfecta para abrir el apetito mientras las brasas toman fuerza. Es sencilla, sabrosa y tiene ese efecto mágico del queso derretido que siempre reúne a todos alrededor de la parrilla. Aunque parece una receta fácil, tiene algunos detalles importantes para evitar que el queso se desarme o se pegue.`,

//       sections: [
//         {
//           title: "Ingredientes",
//           body: [
//             `1 pieza de queso provoleta o queso apto para parrilla.`,
//             `Orégano seco a gusto.`,
//             `Merkén o ají molido a gusto.`,
//             `Aceite de oliva o aceite común.`,
//             `Pimienta a gusto.`,
//             `Opcional: tomates cherry, albahaca o un toque de miel para una versión diferente.`,
//           ],
//         },
//         {
//           title: "Preparación paso a paso",
//           body: [
//             `Antes de poner la provoleta en la parrilla, sécala bien con papel absorbente. Esto ayuda a que se dore mejor y reduce el riesgo de que se pegue.`,
//             `Unta ligeramente la superficie con aceite y agrega orégano, pimienta y merkén. No es necesario usar demasiados condimentos, porque el queso ya tiene bastante sabor.`,
//             `Pon la provoleta sobre una plancha, sartén de fierro, fuente apta para parrilla o papel aluminio resistente. Evita ponerla directamente sobre la rejilla si no tienes experiencia, porque puede derretirse demasiado rápido y caer sobre las brasas.`,
//             `Cocina a fuego medio hasta que el queso esté caliente, blando y dorado en la superficie. Sirve inmediatamente con pan, tostadas o verduras asadas.`,
//           ],
//         },
//         {
//           title: "Consejos para que no se rompa",
//           body: [
//             `No uses fuego demasiado fuerte. La provoleta necesita calor controlado para fundirse sin quemarse.`,
//             `Si la pieza es muy delgada, puede derretirse demasiado rápido. Conviene usar una porción gruesa o cocinarla en recipiente.`,
//             `Sirve apenas esté lista. La gracia de la provoleta está en comerla caliente, cuando aún está suave y fundida.`,
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "malaya-a-la-pizza-a-la-parrilla",
//     title: "Malaya a la pizza: receta parrillera para sorprender",
//     category: "Recetas",
//     excerpt:
//       "Una forma sabrosa y distinta de preparar malaya a la parrilla con salsa de tomate, queso y toppings estilo pizza.",
//     readTime: "8 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "red",
//     // Malaya a la pizza
//     image: "/blog/malaya-pizza.jpg",
//     imageAlt: "Malaya a la pizza preparada a la parrilla con queso y salsa de tomate",
//     content: {
//       intro: `La malaya a la pizza es una preparación ideal para quienes quieren salir del asado tradicional sin complicarse demasiado. La malaya es un corte sabroso, delgado y versátil, que se adapta muy bien a preparaciones rellenas o cubiertas. Al combinarla con salsa de tomate, queso y condimentos, se transforma en una receta llamativa, rendidora y perfecta para compartir.`,

//       sections: [
//         {
//           title: "Ingredientes",
//           body: [
//             `1 malaya limpia y extendida.`,
//             `Sal gruesa o sal fina a gusto.`,
//             `Pimienta a gusto.`,
//             `Salsa de tomate o salsa para pizza.`,
//             `Queso mantecoso, mozzarella o el queso que prefieras.`,
//             `Orégano seco.`,
//             `Jamón, tomate, aceitunas, pimentón, cebolla o champiñones a gusto.`,
//             `Opcional: merkén, ajo en polvo o ají para darle más carácter.`,
//           ],
//         },
//         {
//           title: "Preparación paso a paso",
//           body: [
//             `Primero limpia la malaya retirando excesos de grasa muy gruesa, pero sin dejarla completamente seca. Un poco de grasa ayuda a mantener sabor y jugosidad durante la cocción.`,
//             `Condimenta la carne con sal y pimienta por ambos lados. Luego ponla sobre la parrilla a fuego medio, primero por el lado que tenga más grasa. Cocínala hasta que comience a dorarse y tomar buen color.`,
//             `Cuando la malaya esté casi lista, agrega encima una capa de salsa de tomate, queso y los toppings elegidos. La idea es que la carne funcione como base, similar a una pizza parrillera.`,
//             `Cubre con una tapa metálica, fuente invertida o papel aluminio sin tocar directamente el queso. Esto ayuda a concentrar el calor para que el queso se derrita sin tener que quemar la carne por abajo.`,
//           ],
//         },
//         {
//           title: "Consejos para un mejor resultado",
//           body: [
//             `No pongas la salsa y el queso desde el comienzo, porque la carne necesita dorarse primero. Si agregas todo demasiado temprano, la malaya puede soltar mucho líquido y perder textura.`,
//             `Usa fuego medio y paciencia. La malaya es delgada, por lo que puede pasarse rápidamente si la dejas demasiado tiempo sobre brasas muy fuertes.`,
//             `Para servir, corta en tiras o cuadrados pequeños. Es una receta ideal para compartir como entrada potente o como parte de una tabla parrillera.`,
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "cuanto-carbon-comprar-para-un-asado",
//     title: "Cuánto carbón comprar para un asado",
//     category: "Consejos",
//     excerpt:
//       "Una guía práctica para calcular la cantidad de carbón según personas, duración del asado y tipo de preparación.",
//     readTime: "6 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "yellow",
//     // Cuánto carbón comprar
//     image: "/blog/carbon-asado.jpg",
//     imageAlt: "Carbón encendido con brasas listas para preparar un asado",
//     content: {
//       intro: `Calcular cuánto carbón comprar es una de las dudas más comunes antes de un asado. Comprar poco puede arruinar la jornada, porque quedarse sin brasas a mitad de cocción es un problema serio. Comprar demasiado no es tan grave, pero puede aumentar el costo y dejar bolsas abiertas sin necesidad. La clave está en considerar cuántas personas comerán, cuánto tiempo estará encendida la parrilla y qué tipo de carne se va a preparar.`,

//       sections: [
//         {
//           title: "Regla simple para calcular carbón",
//           body: [
//             `Para un asado pequeño de 4 a 6 personas, una bolsa de 2,5 kg a 3 kg puede ser suficiente si se cocinarán cortes rápidos, embutidos o pollo.`,
//             `Para un asado mediano de 8 a 12 personas, conviene considerar entre 4 kg y 6 kg de carbón, especialmente si habrá varios cortes y la parrilla estará encendida por más tiempo.`,
//             `Para un asado grande de 15 a 20 personas, lo más prudente es tener entre 8 kg y 10 kg de carbón, más una reserva adicional si se harán cortes lentos o una segunda tanda de carne.`,
//           ],
//         },
//         {
//           title: "Factores que cambian la cantidad",
//           body: [
//             `No todos los asados consumen el mismo carbón. Si vas a preparar cortes gruesos, costillar, malaya, pollo entero o carnes que requieren más tiempo, necesitarás más brasas.`,
//             `También influye el clima. En días fríos, con viento o en lugares abiertos, el carbón puede consumirse más rápido porque cuesta mantener una temperatura estable.`,
//             `El tipo de parrilla también importa. Una parrilla grande requiere más carbón para cubrir bien la superficie, mientras que una parrilla pequeña permite concentrar mejor el calor.`,
//           ],
//         },
//         {
//           title: "Consejo práctico",
//           body: [
//             `Siempre es mejor tener una pequeña reserva de carbón sin abrir. Si no la usas, queda para el próximo asado. En cambio, si falta carbón, no hay mucha solución rápida.`,
//             `Una buena recomendación es calcular lo necesario y sumar un margen de seguridad de una bolsa pequeña, especialmente cuando hay invitados o cuando el asado será largo.`,
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "diferencias-entre-carbones-en-chile",
//     title: "Diferencias entre carbones en Chile: cuál elegir para tu asado",
//     category: "Consejos",
//     excerpt:
//       "Una explicación simple sobre los tipos de carbón más comunes y cómo elegir según duración, calor, humo y tipo de asado.",
//     readTime: "7 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "green",
//     // Diferencias entre carbones en Chile
//     image: "/blog/carbones-chile.jpg",
//     imageAlt: "Diferentes tipos de carbón usados para asados en Chile",
//     content: {
//       intro: `En Chile es común encontrar distintos tipos de carbón para asado, y aunque a simple vista parezcan similares, no todos funcionan igual. Algunos prenden rápido pero duran poco, otros generan brasas más firmes y algunos pueden producir más humo o chispas. Elegir bien el carbón ayuda a controlar mejor la cocción, evitar frustraciones y lograr carnes mejor preparadas.`,

//       sections: [
//         {
//           title: "Carbón vegetal tradicional",
//           body: [
//             `Es el carbón más común para asados caseros. Suele venir en trozos irregulares y puede variar bastante en tamaño y calidad según la marca o el origen.`,
//             `Cuando es de buena calidad, prende relativamente bien, genera buenas brasas y entrega un sabor clásico a parrilla. Sin embargo, si viene con mucho polvo, piedras o trozos demasiado pequeños, puede rendir menos.`,
//             `Es una buena opción para asados familiares, choripanes, cortes rápidos, pollo, cerdo y preparaciones de duración media.`,
//           ],
//         },
//         {
//           title: "Briquetas",
//           body: [
//             `Las briquetas son piezas compactadas que suelen tener forma más pareja. Su ventaja principal es que entregan calor más estable y pueden durar más tiempo que algunos carbones tradicionales.`,
//             `Son útiles cuando se busca una cocción más pareja o cuando el asado necesita mantener temperatura durante más tiempo. También pueden ser prácticas para parrillas con tapa o preparaciones indirectas.`,
//             `Como desventaja, algunas personas sienten que entregan menos aroma tradicional que el carbón vegetal. También es importante elegir briquetas de buena calidad para evitar olores extraños.`,
//           ],
//         },
//         {
//           title: "Qué mirar antes de comprar",
//           body: [
//             `Revisa que la bolsa no tenga demasiado polvo. Mucho polvo significa menos trozos útiles y menor rendimiento.`,
//             `Prefiere carbón con trozos medianos y firmes. Si son demasiado pequeños, se consumen rápido; si son excesivamente grandes, pueden costar más en prender.`,
//             `Si harás un asado largo, considera carbón de mejor rendimiento o mezcla carbón tradicional con briquetas. Para asados rápidos, un carbón vegetal común de buena calidad puede ser suficiente.`,
//           ],
//         },
//       ],
//     },
//   },
//   {
//     slug: "como-elegir-la-carne-para-un-asado",
//     title: "Cómo elegir la carne para un asado",
//     category: "Consejos",
//     excerpt:
//       "Consejos simples para elegir carne considerando tipo de corte, grasa, cantidad de personas, presupuesto y forma de cocción.",
//     readTime: "8 min de lectura",
//     date: "25 de julio, 2026",
//     accent: "red",
//     // Cómo elegir la carne
//     image: "/blog/elegir-carne.jpg",
//     imageAlt: "Cortes de carne frescos para elegir antes de preparar un asado",
//     content: {
//       intro: `Elegir la carne correcta puede marcar la diferencia entre un asado común y uno memorable. No se trata solamente de comprar el corte más caro, sino de escoger según el tipo de invitados, el presupuesto, el tiempo disponible y la forma de cocción. Una buena elección permite equilibrar sabor, rendimiento y costo.`,

//       sections: [
//         {
//           title: "Define primero el tipo de asado",
//           body: [
//             `Antes de elegir cortes, piensa qué tipo de asado quieres hacer. No es lo mismo una reunión rápida con choripanes y cortes delgados que un asado largo con costillar, malaya, pollo y cortes gruesos.`,
//             `Si tienes poco tiempo, conviene elegir cortes de cocción más rápida. Si tienes una tarde completa, puedes incluir carnes que necesiten más paciencia y fuego controlado.`,
//             `También considera si habrá niños, personas que comen poco o invitados con preferencias distintas. En esos casos, conviene tener variedad y no depender de un solo tipo de carne.`,
//           ],
//         },
//         {
//           title: "Mira la grasa y el color",
//           body: [
//             `Una buena carne para asado suele tener color atractivo, textura firme y grasa visible pero equilibrada. La grasa aporta sabor y jugosidad, pero en exceso puede generar llamaradas o pérdida de rendimiento.`,
//             `En cortes de vacuno, busca una carne de color rojo vivo o rojo cereza, evitando piezas opacas, con mal olor o con exceso de líquido en el envase.`,
//             `En pollo y cerdo, revisa que la carne tenga buen color, olor fresco y que se mantenga refrigerada correctamente hasta el momento de cocinar.`,
//           ],
//         },
//         {
//           title: "Equilibra cortes premium y cortes rendidores",
//           body: [
//             `Una estrategia inteligente es combinar un corte principal con opciones más rendidoras. Por ejemplo, puedes incluir un buen corte de vacuno y complementar con cerdo, pollo o embutidos.`,
//             `Esto permite controlar mejor el costo total del asado sin sacrificar variedad. Además, no todos los invitados comen lo mismo, por lo que tener distintas opciones suele funcionar mejor.`,
//             `El mejor asado no siempre es el más caro. Muchas veces es el que está mejor planificado, mejor calculado y mejor cocinado.`,
//           ],
//         },
//         {
//           title: "Compra pensando en la parrilla, no solo en el precio",
//           body: [
//             `Un corte barato no siempre es conveniente si tiene mucho desperdicio, hueso o grasa que no se consumirá. Del mismo modo, un corte caro puede rendir bien si se aprovecha completo y se cocina correctamente.`,
//             `Piensa en cuánto se va a comer realmente, cuánto tiempo tendrás para cocinar y qué acompañamientos habrá. Esa combinación ayuda a elegir mejor y evitar compras impulsivas.`,
//             `Si tienes dudas, una buena calculadora de asados puede ayudarte a estimar kilos, costos y compra sugerida antes de ir a comprar.`,
//           ],
//         },
//       ],
//     },
//   },
// ];