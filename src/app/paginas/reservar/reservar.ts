import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../servicios/reserva.service';
//define un formulario con 4 campos y al enviarlo le pide a ReservaService que guarde la reserva. También permite eliminar reservas.
@Component({
  selector: 'app-reservar',
  imports: [ReactiveFormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css'
})
export class Reservar {
  private fb = inject(FormBuilder);
  private servicio = inject(ReservaService);

  reservas = this.servicio.reservas;
  creada = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    personas: [2, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { nombre, fecha, hora, personas } = this.form.getRawValue();
    this.servicio.agregar(nombre, fecha, hora, personas);
    this.creada.set(true);
    this.form.reset({ personas: 2 });
  }

  cancelar(id: number) {
    this.servicio.eliminar(id);
  }
}