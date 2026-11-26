import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlatoService } from '../../servicios/plato.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private platoService = inject(PlatoService);

  platos = this.platoService.obtenerTodos();
  mostrarDetalles = signal(false);

  alternarDetalles(): void {
    this.mostrarDetalles.update((valor) => !valor);
  }
}
