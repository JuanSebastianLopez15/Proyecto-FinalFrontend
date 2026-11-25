import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
//función que compara dos campos de un formulario y avisa si no son iguales
export function coinciden(campo1: string, campo2: string): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const valor1 = grupo.get(campo1)?.value;
    const valor2 = grupo.get(campo2)?.value;
    if (!valor1 || !valor2) return null;
    return valor1 === valor2 ? null : { noCoinciden: true };
  };
}