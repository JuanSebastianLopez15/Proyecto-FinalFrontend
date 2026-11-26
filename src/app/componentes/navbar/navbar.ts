import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // Conecta el servicio de autenticacion
  auth = inject(AuthService);

  // Controla si el menu hamburguesa esta abierto en celular
  menuAbierto = signal<boolean>(false);

  // Alterna el estado del menu movil
  alternarMenu() {
    this.menuAbierto.update((actual) => !actual);
  }

  // Cierra el menu movil al navegar a una ruta
  cerrarMenu() {
    this.menuAbierto.set(false);
  }

  // Cierra la sesion del usuario y cierra el menu movil
  salir() {
    this.auth.cerrarSesion();
    this.cerrarMenu();
  }
}