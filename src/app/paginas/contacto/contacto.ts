import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  // Conecta el constructor de formularios reactivos
  private fb = inject(FormBuilder);

  // Indica si el mensaje ya fue enviado
  enviado = signal<boolean>(false);

  // Define los campos del formulario y sus validaciones
  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  // Verifica si un campo tiene errores y ya fue tocado
  invalido(campo: 'nombre' | 'correo' | 'mensaje'): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && control.touched;
  }

  // Valida y procesa el envio del formulario
  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviado.set(true);
    this.formulario.reset();
  }
}