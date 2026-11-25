import { Injectable, signal } from '@angular/core';
import { Reserva } from '../modelos/reserva';
//esto lo que hace es guardar y leer las reservas en el localStorage, y además mantiene una señal con la lista de reservas para que los componentes puedan reaccionar a los cambios
@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly clave = 'restaurante-reservas';

  reservas = signal<Reserva[]>(this.leer());

  agregar(nombre: string, fecha: string, hora: string, personas: number): void {
    const nueva: Reserva = { id: Date.now(), nombre, fecha, hora, personas };
    this.reservas.set([...this.reservas(), nueva]);
    this.guardar();
  }

  eliminar(id: number): void {
    this.reservas.set(this.reservas().filter((r) => r.id !== id));
    this.guardar();
  }

  private guardar(): void {
    localStorage.setItem(this.clave, JSON.stringify(this.reservas()));
  }

  private leer(): Reserva[] {
    return JSON.parse(localStorage.getItem(this.clave) ?? '[]');
  }
}