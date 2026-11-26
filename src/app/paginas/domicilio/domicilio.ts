import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plato } from '../../modelos/plato';
import { Pedido } from '../../modelos/pedido';
import { PlatoService } from '../../servicios/plato.service';
import { PedidoService } from '../../servicios/pedido.service';
import { PrecioCopPipe } from '../../pipes/precio-cop-pipe';

@Component({
  selector: 'app-domicilio',
  imports: [ReactiveFormsModule, PrecioCopPipe],
  templateUrl: './domicilio.html',
  styleUrl: './domicilio.css',
})
export class Domicilio {
  private readonly platoService = inject(PlatoService);
  protected readonly pedidoService = inject(PedidoService);
  private readonly fb = inject(FormBuilder);

  protected readonly platos = this.platoService.obtenerTodos();
  protected readonly platoArrastrado = signal<number | null>(null);
  protected readonly zonaActiva = signal(false);
  protected readonly pedidoCreado = signal<Pedido | null>(null);

  protected readonly formulario = this.fb.nonNullable.group({
    cliente: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
  });

  protected alIniciarArrastre(evento: DragEvent, plato: Plato): void {
    evento.dataTransfer?.setData('text/plain', String(plato.id));
    this.platoArrastrado.set(plato.id);
  }

  protected alTerminarArrastre(): void {
    this.platoArrastrado.set(null);
    this.zonaActiva.set(false);
  }

  protected alPasarSobreZona(evento: DragEvent): void {
    evento.preventDefault();
    this.zonaActiva.set(true);
  }

  protected alSalirDeZona(): void {
    this.zonaActiva.set(false);
  }

  protected alSoltar(evento: DragEvent): void {
    evento.preventDefault();
    const id = Number(evento.dataTransfer?.getData('text/plain'));
    const plato = this.platoService.obtenerPorId(id);
    if (plato) {
      this.pedidoService.agregar(plato);
    }
    this.alTerminarArrastre();
  }

  protected agregar(plato: Plato): void {
    this.pedidoService.agregar(plato);
  }

  protected campoInvalido(campo: 'cliente' | 'direccion' | 'telefono'): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && control.touched;
  }

  protected confirmarPedido(): void {
    if (this.formulario.invalid || !this.pedidoService.hayPlatos()) {
      this.formulario.markAllAsTouched();
      return;
    }
    const pedido = this.pedidoService.crearPedido(this.formulario.getRawValue(), null);
    this.pedidoCreado.set(pedido);
    this.formulario.reset();
  }

  protected nuevoPedido(): void {
    this.pedidoCreado.set(null);
  }
}
