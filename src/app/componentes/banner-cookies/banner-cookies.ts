import { Component, inject, signal } from '@angular/core';
import { CookieService } from '../../servicios/cookie.service';

@Component({
  selector: 'app-banner-cookies',
  templateUrl: './banner-cookies.html',
  styleUrl: './banner-cookies.css'
})
export class BannerCookies {
  private cookies = inject(CookieService);

  visible = signal(this.cookies.leer('restaurante-cookies') === null);

  responder(respuesta: string) {
    this.cookies.guardar('restaurante-cookies', respuesta, 365);
    this.visible.set(false);
  }
}