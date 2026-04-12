interface Corte {
  nombre: string;
  precio: number;
}

interface Carnes {
  vacuno: Corte[];
  cerdo: Corte[];
  pollo: Corte[];
}

export const carnes: Carnes = {
  vacuno: [
    { nombre: "Huachalomo", precio: 8500 },
    { nombre: "Lomo liso", precio: 12000 },
    { nombre: "Lomo vetado", precio: 14000 },
    { nombre: "Sobrecostilla", precio: 9500 },
    { nombre: "Asado carnicero", precio: 11000 },
  ],
  cerdo: [
    { nombre: "Lomo", precio: 7500 },
    { nombre: "Costillar", precio: 7000 },
    { nombre: "Malaya", precio: 6800 },
    { nombre: "Chuleta vetada", precio: 7200 },
  ],
  pollo: [
    { nombre: "Pechuga", precio: 6000 },
    { nombre: "Truto corto", precio: 5200 },
    { nombre: "Truto largo", precio: 5400 },
    { nombre: "Alitas", precio: 5000 },
  ],
};
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