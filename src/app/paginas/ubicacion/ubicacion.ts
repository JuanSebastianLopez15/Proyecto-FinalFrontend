
import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UbicacionService } from '../../servicios/ubicacion.service';
import { Coordenadas, RESTAURANTE } from '../../modelos/restaurante';

@Component({
  selector: 'app-ubicacion',
  imports: [DecimalPipe],
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.css',
})
export class Ubicacion {
  // Conecta el servicio de ubicacion
  private ubicacionService = inject(UbicacionService);

  // Guarda las coordenadas del usuario
  coordenadas = signal<Coordenadas | null>(null);

  // Guarda la distancia hasta el restaurante
  distancia = signal<number | null>(null);

  // Guarda los mensajes de error
  mensajeError = signal<string>('');

  // Indica si se esta buscando la ubicacion
  cargando = signal<boolean>(false);

  // Obtiene la ubicacion y calcula la distancia
  async obtenerUbicacion() {
    this.cargando.set(true);
    this.mensajeError.set('');

    try {
      // Solicita las coordenadas al servicio
      const posicion = await this.ubicacionService.obtenerPosicion();
      this.coordenadas.set(posicion);

      // Calcula la distancia hasta el restaurante
      const distanciaCalculada = this.ubicacionService.distanciaKm(
        posicion,
        RESTAURANTE
      );

      this.distancia.set(distanciaCalculada);

    } catch (error) {
      // Identifica el tipo de error de ubicacion
      const errorUbicacion = error as GeolocationPositionError;

      if (errorUbicacion.code === 1) {
        this.mensajeError.set('Permiso de ubicacion denegado.');
      } else if (errorUbicacion.code === 2) {
        this.mensajeError.set('La ubicacion no esta disponible.');
      } else if (errorUbicacion.code === 3) {
        this.mensajeError.set('Se agoto el tiempo para obtener la ubicacion.');
      } else {
        this.mensajeError.set('Ocurrio un error al obtener la ubicacion.');
      }

    } finally {
      // Finaliza el proceso de busqueda
      this.cargando.set(false);
    }
  }
}
