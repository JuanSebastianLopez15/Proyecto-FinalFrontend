import { Injectable, signal } from '@angular/core';
import { Usuario, Sesion } from '../modelos/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly claveUsuarios = 'restaurante-usuarios';
  private readonly claveSesion = 'restaurante-sesion';

  sesion = signal<Sesion | null>(this.leerSesion());

  haySesion(): boolean {
    return this.sesion() !== null;
  }

  registrar(usuario: Usuario): boolean {
    const usuarios = this.leerUsuarios();
    const existe = usuarios.find(
      (u) => u.correo.toLowerCase() === usuario.correo.toLowerCase()
    );
    if (existe) {
      return false;
    }
    usuarios.push(usuario);
    localStorage.setItem(this.claveUsuarios, JSON.stringify(usuarios));
    return true;
  }

  iniciarSesion(correo: string, clave: string): boolean {
    const usuario = this.leerUsuarios().find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave
    );
    if (!usuario) {
      return false;
    }
    const sesion: Sesion = { nombre: usuario.nombre, correo: usuario.correo };
    sessionStorage.setItem(this.claveSesion, JSON.stringify(sesion));
    this.sesion.set(sesion);
    return true;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.claveSesion);
    this.sesion.set(null);
  }

  private leerUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.claveUsuarios) ?? '[]');
  }

  private leerSesion(): Sesion | null {
    const guardada = sessionStorage.getItem(this.claveSesion);
    return guardada ? JSON.parse(guardada) : null;
  }
}