import { Injectable, signal } from '@angular/core';
import { Plato } from '../modelos/plato';
import { DatosEntrega, ItemPedido, Pedido } from '../modelos/pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly clavePedidos = 'restaurante-pedidos';

  items = signal<ItemPedido[]>([]);

  agregar(plato: Plato): void {
    const yaEsta = this.items().find((item) => item.plato.id === plato.id);
    if (yaEsta) {
      this.cambiarCantidad(plato.id, 1);
      return;
    }
    this.items.set([...this.items(), { plato: plato, cantidad: 1 }]);
  }

  cambiarCantidad(platoId: number, cambio: number): void {
    const nuevos = this.items()
      .map((item) =>
        item.plato.id === platoId ? { plato: item.plato, cantidad: item.cantidad + cambio } : item
      )
      .filter((item) => item.cantidad > 0);
    this.items.set(nuevos);
  }

  quitar(platoId: number): void {
    this.items.set(this.items().filter((item) => item.plato.id !== platoId));
  }

  hayPlatos(): boolean {
    return this.items().length > 0;
  }

  total(): number {
    let suma = 0;
    for (const item of this.items()) {
      suma += item.plato.precio * item.cantidad;
    }
    return suma;
  }

  crearPedido(datos: DatosEntrega, distanciaKm: number | null): Pedido {
    const pedido: Pedido = {
      id: Date.now(),
      items: this.items(),
      cliente: datos.cliente,
      direccion: datos.direccion,
      telefono: datos.telefono,
      total: this.total(),
      distanciaKm: distanciaKm
    };
    const pedidos = this.leerPedidos();
    pedidos.push(pedido);
    localStorage.setItem(this.clavePedidos, JSON.stringify(pedidos));
    this.items.set([]);
    return pedido;
  }

  private leerPedidos(): Pedido[] {
    return JSON.parse(localStorage.getItem(this.clavePedidos) ?? '[]');
  }
}
