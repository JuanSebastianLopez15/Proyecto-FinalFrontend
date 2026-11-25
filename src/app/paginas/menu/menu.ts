import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlatoService } from '../../servicios/plato.service';
import { PrecioCopPipe } from '../../pipes/precio-cop-pipe';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, PrecioCopPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private readonly platoService = inject(PlatoService);

  protected readonly platos = this.platoService.obtenerTodos();
  protected readonly mostrarDetalles = signal(false);

  protected alternarDetalles(): void {
    this.mostrarDetalles.update((valor) => !valor);
  }
}
