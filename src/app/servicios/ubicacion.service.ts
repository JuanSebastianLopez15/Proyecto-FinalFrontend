
import { Injectable } from '@angular/core';
import { Coordenadas } from '../modelos/restaurante';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  // Obtiene la ubicacion actual del usuario
  obtenerPosicion(): Promise<Coordenadas> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          resolve({
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  // Calcula la distancia entre dos coordenadas usando Haversine
  distanciaKm(origen: Coordenadas, destino: Coordenadas): number {
    const R = 6371;

    const rad = (g: number) => g * Math.PI / 180;

    const dLat = rad(destino.lat - origen.lat);
    const dLng = rad(destino.lng - origen.lng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(origen.lat)) *
      Math.cos(rad(destino.lat)) *
      Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(a));
  }
}
