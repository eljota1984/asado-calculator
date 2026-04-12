export interface Corte {
  nombre: string;
  precio: number;
}

export interface Carnes {
  vacuno: Corte[];
  cerdo: Corte[];
  pollo: Corte[];
}

export const carnes: Carnes = {
  vacuno: [
    { nombre: "Lomo vetado", precio: 18590 },
    { nombre: "Lomo liso", precio: 13990 },
    { nombre: "Sobrecostilla", precio: 8790 },
    { nombre: "Huachalomo", precio: 8790 },
    { nombre: "Asado del carnicero", precio: 8790 },
    { nombre: "Punta picana", precio: 14390 },
    { nombre: "Filete", precio: 18990 },
    { nombre: "Choclillo", precio: 11190 },
    { nombre: "Ganso", precio: 8990 },
    { nombre: "Posta rosada", precio: 8490 },
    { nombre: "Asiento", precio: 12990 },
    { nombre: "Punta de ganso", precio: 13990 },
    { nombre: "Plateada", precio: 11990 },
    { nombre: "Entraña", precio: 16990 },
    { nombre: "Tapabarriga", precio: 12190 },
    { nombre: "Tapapecho", precio: 10990 },
    { nombre: "Punta paleta", precio: 10490 },
    { nombre: "Posta negra", precio: 10990 },
  ],

  cerdo: [
    { nombre: "Costillar", precio: 9590 },
    { nombre: "Lomo", precio: 7990 },
    { nombre: "Malaya", precio: 14975 },
    { nombre: "Pulpa de cerdo", precio: 8990 },
    { nombre: "Chuleta vetada", precio: 8990 },
    { nombre: "Chuleta centro", precio: 8290 },
    { nombre: "Punta de ganso de cerdo", precio: 8490 },
    { nombre: "Pierna de cerdo", precio: 7690 },
    { nombre: "Pernil", precio: 8990 },
    { nombre: "Costillar ahumado", precio: 10990 },
  ],

  pollo: [
    { nombre: "Pechuga", precio: 6650 },
    { nombre: "Filetitos de pechuga", precio: 6990 },
    { nombre: "Trutro entero", precio: 5790 },
    { nombre: "Trutro corto", precio: 5790 },
    { nombre: "Trutro largo", precio: 5890 },
    { nombre: "Alitas", precio: 4990 },
    { nombre: "Pollo entero", precio: 3790 },
    { nombre: "Pechuga deshuesada", precio: 6990 },
    { nombre: "Pechuga con hueso", precio: 5490 },
    { nombre: "Trutro ala", precio: 4690 },
  ],
};
// interface Corte {
//   nombre: string;
//   precio: number;
// }

// interface Carnes {
//   vacuno: Corte[];
//   cerdo: Corte[];
//   pollo: Corte[];
// }

// export const carnes: Carnes = {
//   vacuno: [
//     { nombre: "Huachalomo", precio: 8500 },
//     { nombre: "Lomo liso", precio: 12000 },
//     { nombre: "Lomo vetado", precio: 14000 },
//     { nombre: "Sobrecostilla", precio: 9500 },
//     { nombre: "Asado carnicero", precio: 11000 },
//   ],
//   cerdo: [
//     { nombre: "Lomo", precio: 7500 },
//     { nombre: "Costillar", precio: 7000 },
//     { nombre: "Malaya", precio: 6800 },
//     { nombre: "Chuleta vetada", precio: 7200 },
//   ],
//   pollo: [
//     { nombre: "Pechuga", precio: 6000 },
//     { nombre: "Truto corto", precio: 5200 },
//     { nombre: "Truto largo", precio: 5400 },
//     { nombre: "Alitas", precio: 5000 },
//   ],
// };
// export const carnes = {
//   vacuno: [
//     { nombre: "Huachalomo", precio: 8500 },
//     { nombre: "Lomo liso", precio: 12000 },
//     { nombre: "Lomo vetado", precio: 14000 },
//     { nombre: "Sobrecostilla", precio: 9500 },
//     { nombre: "Asado carnicero", precio: 11000 },
//   ],
//   cerdo: [
//     { nombre: "Lomo", precio: 7500 },
//     { nombre: "Costillar", precio: 7000 },
//     { nombre: "Malaya", precio: 6800 },
//     { nombre: "Chuleta vetada", precio: 7200 },
//   ],
//   pollo: [
//     { nombre: "Pechuga", precio: 6000 },
//     { nombre: "Truto corto", precio: 5200 },
//     { nombre: "Truto largo", precio: 5400 },
//     { nombre: "Alitas", precio: 5000 },
//   ],
// };