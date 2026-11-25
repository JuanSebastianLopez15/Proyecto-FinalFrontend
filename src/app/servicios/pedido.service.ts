import { Injectable, computed, signal } from '@angular/core';
import { Plato } from '../modelos/plato';
import { DatosEntrega, ItemPedido, Pedido } from '../modelos/pedido';

const CLAVE_PEDIDOS = 'pedidos';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly itemsCarrito = signal<ItemPedido[]>([]);
  private readonly pedidosGuardados = signal<Pedido[]>(this.leerPedidos());

  readonly items = this.itemsCarrito.asReadonly();
  readonly pedidos = this.pedidosGuardados.asReadonly();
  readonly total = computed(() =>
    this.itemsCarrito().reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0),
  );
  readonly cantidadPlatos = computed(() =>
    this.itemsCarrito().reduce((suma, item) => suma + item.cantidad, 0),
  );

  agregar(plato: Plato): void {
    this.itemsCarrito.update((items) => {
      const existe = items.some((item) => item.plato.id === plato.id);
      return existe
        ? items.map((item) =>
            item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item,
          )
        : [...items, { plato, cantidad: 1 }];
    });
  }

  cambiarCantidad(platoId: number, cambio: number): void {
    this.itemsCarrito.update((items) =>
      items
        .map((item) =>
          item.plato.id === platoId ? { ...item, cantidad: item.cantidad + cambio } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  quitar(platoId: number): void {
    this.itemsCarrito.update((items) => items.filter((item) => item.plato.id !== platoId));
  }

  vaciar(): void {
    this.itemsCarrito.set([]);
  }

  crearPedido(datos: DatosEntrega, distanciaKm: number | null): Pedido {
    const pedido: Pedido = {
      id: Date.now(),
      items: this.itemsCarrito(),
      ...datos,
      total: this.total(),
      distanciaKm,
      fecha: new Date().toISOString(),
    };

    this.pedidosGuardados.update((pedidos) => [...pedidos, pedido]);
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(this.pedidosGuardados()));
    this.vaciar();
    return pedido;
  }

  private leerPedidos(): Pedido[] {
    const guardados = localStorage.getItem(CLAVE_PEDIDOS);
    if (!guardados) {
      return [];
    }
    try {
      return JSON.parse(guardados) as Pedido[];
    } catch {
      return [];
    }
  }
}
