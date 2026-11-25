import { Plato } from './plato';

export interface ItemPedido {
  plato: Plato;
  cantidad: number;
}

export interface Pedido {
  id: number;
  items: ItemPedido[];
  cliente: string;
  direccion: string;
  telefono: string;
  total: number;
  distanciaKm: number | null;
  fecha: string;
}
