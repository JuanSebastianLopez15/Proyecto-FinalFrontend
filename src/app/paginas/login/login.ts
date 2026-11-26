import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CookieService } from '../../servicios/cookie.service';
//este componente define el formulario de login, valida los campos y llama a AuthService para iniciar sesión. También maneja la cookie de recordar correo si el usuario lo desea y ha aceptado las cookies.
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private cookies = inject(CookieService);
  private router = inject(Router);
  sesion = this.auth.sesion;

  correoRecordado = this.cookies.leer('restaurante-correo');

  form = this.fb.nonNullable.group({
    correo: [this.correoRecordado ?? '', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    recordar: [this.correoRecordado !== null]
  });

  errorLogin = signal(false);

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { correo, clave, recordar } = this.form.getRawValue();
    const entro = this.auth.iniciarSesion(correo, clave);
    this.errorLogin.set(!entro);
    if (!entro) {
      return;
    }

    const aceptadas = this.cookies.leer('restaurante-cookies') === 'aceptadas';
    if (recordar && aceptadas) {
      this.cookies.guardar('restaurante-correo', correo, 30);
    } else {
      this.cookies.eliminar('restaurante-correo');
    }
    this.router.navigate(['/']);
  }
  cerrarSesion() {
    this.auth.cerrarSesion();
  }
}