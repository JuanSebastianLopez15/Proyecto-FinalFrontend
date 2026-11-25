import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { coinciden } from '../../validadores/coinciden';
//define el formulario con sus reglas, y al enviarlo le pide a AuthService que guarde al usuario.
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(8)]],
    confirmar: ['', Validators.required]
  }, {
    validators: coinciden('clave', 'confirmar')
  });

  registrado = signal(false);
  correoRepetido = signal(false);

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { nombre, correo, clave } = this.form.getRawValue();
    const creado = this.auth.registrar({ nombre, correo, clave });
    this.correoRepetido.set(!creado);
    this.registrado.set(creado);
    if (creado) {
      this.form.reset();
    }
  }
}