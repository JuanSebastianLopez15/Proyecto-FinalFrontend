import { Injectable } from '@angular/core';
//Es un servicio con tres métodos, uno por cada operación que pide la rúbrica: guardar, leer y eliminar cookies.
@Injectable({ providedIn: 'root' })
export class CookieService {
  guardar(nombre: string, valor: string, dias: number): void {
    const segundos = dias * 24 * 60 * 60;
    document.cookie = `${nombre}=${valor}; max-age=${segundos}; path=/; SameSite=Lax`;
  }

  leer(nombre: string): string | null {
    const cookies = document.cookie.split('; ');
    const encontrada = cookies.find((c) => c.startsWith(`${nombre}=`));
    return encontrada ? encontrada.substring(nombre.length + 1) : null;
  }

  eliminar(nombre: string): void {
    document.cookie = `${nombre}=; max-age=0; path=/`;
  }
}