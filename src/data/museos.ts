// Auto-generado desde datos abiertos del SIC (sic.cultura.gob.mx)
// 195 museos de la Ciudad de México

export interface Museo {
  id: number;
  sicId: number;
  nombre: string;
  tematica: string;
  categoria: string;
  direccion: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  telefono: string;
  web: string;
  lat: number;
  lng: number;
  horario: string;
  costo: string;
}

import data from "./museos.json";
export const museos: Museo[] = data;

export const categorias: string[] = ["Arqueología","Arte","Ciencias","General","Historia"];

export const COLORES_CATEGORIAS: Record<string, string> = {
  "Arqueología": "#e74c3c",
  "Arte": "#9b59b6",
  "Ciencias": "#2980b9",
  "Historia": "#27ae60",
  "General": "#e67e22",
  "Otro": "#7f8c8d",
};
