export interface Cachorro {
  id: number;
  nombre: string;
  raza: string;
  peso: number;
  sexo: "Macho" | "Hembra";
  caracteristicas: string;
  edad: number;
  estadoAdopcion: "Disponible" | "Adoptado";
  esterilizado: boolean;
  imagen: string;
}

export const cachorrosIniciales: Cachorro[] = [
  {
    id: 1,
    nombre: "Max",
    raza: "Golden Retriever",
    peso: 8.5,
    sexo: "Macho",
    caracteristicas: "Juguetón, cariñoso, sociable",
    edad: 5,
    estadoAdopcion: "Disponible",
    esterilizado: false,
    imagen: "/cachorros/max.jpg",
  },
  {
    id: 2,
    nombre: "Luna",
    raza: "Beagle",
    peso: 7.2,
    sexo: "Hembra",
    caracteristicas: "Tranquila y obediente",
    edad: 8,
    estadoAdopcion: "Adoptado",
    esterilizado: true,
    imagen: "/cachorros/luna.jpg",
  },
  {
    id: 3,
    nombre: "Rocky",
    raza: "Mestizo",
    peso: 12.4,
    sexo: "Macho",
    caracteristicas: "Activo, inteligente y protector",
    edad: 12,
    estadoAdopcion: "Disponible",
    esterilizado: true,
    imagen: "/cachorros/rocky.jpg",
  },
  {
    id: 4,
    nombre: "Dobby",
    raza: "Pinscher",
    peso: 2.4,
    sexo: "Macho",
    caracteristicas: "Tembleque, Meon, Travieso",
    edad: 20,
    estadoAdopcion: "Disponible",
    esterilizado: true,
    imagen: "/cachorros/dobby.jpg",
  },
];
