import { Pipe, PipeTransform } from '@angular/core';

const FORMATO_COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

@Pipe({ name: 'precioCop' })
export class PrecioCopPipe implements PipeTransform {
  transform(valor: number): string {
    return FORMATO_COP.format(valor);
  }
}
