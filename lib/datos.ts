export interface Corte {
  nombre: string;
  precio: number;
  parrilla: boolean;
}

export interface Carnes {
  vacuno: Corte[];
  cerdo: Corte[];
  pollo: Corte[];
}

export const carnes: Carnes = {
  vacuno: [
    { nombre: "Lomo vetado", precio: 18590, parrilla: true },
    { nombre: "Lomo liso", precio: 13990, parrilla: true },
    { nombre: "Sobrecostilla", precio: 8790, parrilla: true },
    { nombre: "Huachalomo", precio: 8790, parrilla: true },
    { nombre: "Asado del carnicero", precio: 8790, parrilla: true },
    { nombre: "Punta picana", precio: 14390, parrilla: true },
    { nombre: "Filete", precio: 18990, parrilla: true },
    { nombre: "Punta de ganso", precio: 13990, parrilla: true },
    { nombre: "Entraña", precio: 16990, parrilla: true },
    { nombre: "Tapabarriga", precio: 12190, parrilla: true },

    { nombre: "Choclillo", precio: 11190, parrilla: false },
    { nombre: "Ganso", precio: 8990, parrilla: false },
    { nombre: "Posta rosada", precio: 8490, parrilla: false },
    { nombre: "Asiento", precio: 12990, parrilla: false },
    { nombre: "Plateada", precio: 11990, parrilla: false },
    { nombre: "Tapapecho", precio: 10990, parrilla: false },
    { nombre: "Punta paleta", precio: 10490, parrilla: false },
    { nombre: "Posta negra", precio: 10990, parrilla: false },
  ],

  cerdo: [
    { nombre: "Costillar", precio: 9590, parrilla: true },
    { nombre: "Lomo", precio: 7990, parrilla: true },
    { nombre: "Malaya", precio: 14975, parrilla: true },
    { nombre: "Chuleta vetada", precio: 8990, parrilla: true },
    { nombre: "Chuleta centro", precio: 8290, parrilla: true },
    { nombre: "Costillar ahumado", precio: 10990, parrilla: true },

    { nombre: "Pulpa de cerdo", precio: 8990, parrilla: false },
    { nombre: "Punta de ganso de cerdo", precio: 8490, parrilla: false },
    { nombre: "Pierna de cerdo", precio: 7690, parrilla: false },
    { nombre: "Pernil", precio: 8990, parrilla: false },
  ],

  pollo: [
    { nombre: "Pechuga", precio: 6650, parrilla: true },
    { nombre: "Filetitos de pechuga", precio: 6990, parrilla: true },
    { nombre: "Trutro entero", precio: 5790, parrilla: true },
    { nombre: "Trutro corto", precio: 5790, parrilla: true },
    { nombre: "Trutro largo", precio: 5890, parrilla: true },
    { nombre: "Alitas", precio: 4990, parrilla: true },
    { nombre: "Pollo entero", precio: 3790, parrilla: true },
    { nombre: "Pechuga deshuesada", precio: 6990, parrilla: true },
    { nombre: "Pechuga con hueso", precio: 5490, parrilla: true },
    { nombre: "Trutro ala", precio: 4690, parrilla: true },
  ],
};