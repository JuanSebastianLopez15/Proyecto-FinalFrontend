import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plato } from '../../modelos/plato';
import { Pedido } from '../../modelos/pedido';
import { PlatoService } from '../../servicios/plato.service';
import { PedidoService } from '../../servicios/pedido.service';
import { UbicacionService } from '../../servicios/ubicacion.service';
import { RESTAURANTE } from '../../modelos/restaurante';

@Component({
  selector: 'app-domicilio',
  imports: [ReactiveFormsModule],
  templateUrl: './domicilio.html',
  styleUrl: './domicilio.css',
})
export class Domicilio {
  private platoService = inject(PlatoService);
  pedidoService = inject(PedidoService);
  private ubicacionService = inject(UbicacionService);
  private fb = inject(FormBuilder);

  platos = this.platoService.obtenerTodos();
  platoArrastrado = signal<number | null>(null);
  zonaActiva = signal(false);
  pedidoCreado = signal<Pedido | null>(null);
  enviando = signal(false);

  form = this.fb.nonNullable.group({
    cliente: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
  });

  alIniciarArrastre(evento: DragEvent, plato: Plato): void {
    evento.dataTransfer?.setData('text/plain', String(plato.id));
    this.platoArrastrado.set(plato.id);
  }

  alTerminarArrastre(): void {
    this.platoArrastrado.set(null);
    this.zonaActiva.set(false);
  }

  alPasarSobreZona(evento: DragEvent): void {
    evento.preventDefault();
    this.zonaActiva.set(true);
  }

  alSalirDeZona(): void {
    this.zonaActiva.set(false);
  }

  alSoltar(evento: DragEvent): void {
    evento.preventDefault();
    const id = Number(evento.dataTransfer?.getData('text/plain'));
    const plato = this.platoService.obtenerPorId(id);
    if (plato) {
      this.pedidoService.agregar(plato);
    }
    this.alTerminarArrastre();
  }

  agregar(plato: Plato): void {
    this.pedidoService.agregar(plato);
  }

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  async confirmarPedido(): Promise<void> {
    if (this.form.invalid || !this.pedidoService.hayPlatos()) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando.set(true);
    const distancia = await this.calcularDistancia();
    const pedido = this.pedidoService.crearPedido(this.form.getRawValue(), distancia);
    this.pedidoCreado.set(pedido);
    this.form.reset();
    this.enviando.set(false);
  }

  private async calcularDistancia(): Promise<number | null> {
    try {
      const posicion = await this.ubicacionService.obtenerPosicion();
      const distancia = this.ubicacionService.distanciaKm(posicion, RESTAURANTE);
      return Math.round(distancia * 10) / 10;
    } catch {
      return null;
    }
  }

  nuevoPedido(): void {
    this.pedidoCreado.set(null);
  }
}
