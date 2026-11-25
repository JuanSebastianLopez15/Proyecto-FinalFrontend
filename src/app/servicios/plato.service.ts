import { Injectable } from '@angular/core';
import { Plato } from '../modelos/plato';

@Injectable({ providedIn: 'root' })
export class PlatoService {
  private readonly platos: readonly Plato[] = [
    {
      id: 1,
      nombre: 'Hamburguesa infantil',
      descripcion: 'Una hamburguesa para los más pequeñitos.',
      precio: 15000,
      imagen: 'platos/hamburguesa-infantil.jpg',
    },
    {
      id: 2,
      nombre: 'Hamburguesa sencilla',
      descripcion: 'Nuestro plato más sencillo.',
      precio: 18000,
      imagen: 'platos/hamburguesa-sencilla.jpg',
    },
    {
      id: 3,
      nombre: 'Hamburguesa Monster',
      descripcion: 'Una hamburguesa más carnuda y grasosa, pero deliciosa.',
      precio: 28000,
      imagen: 'platos/hamburguesa-monster.jpg',
    },
    {
      id: 4,
      nombre: 'Combo papas + gaseosa',
      descripcion: 'Hamburguesa sencilla con papas y gaseosa.',
      precio: 25000,
      imagen: 'platos/combo-papas-gaseosa.jpg',
    },
    {
      id: 5,
      nombre: 'Combo de amigos',
      descripcion: 'El mejor combo para que los mejores amigos compartan.',
      precio: 65000,
      imagen: 'platos/combo-de-amigos.jpg',
    },
  ];

  obtenerTodos(): readonly Plato[] {
    return this.platos;
  }

  obtenerPorId(id: number): Plato | undefined {
    return this.platos.find((plato) => plato.id === id);
  }
}
