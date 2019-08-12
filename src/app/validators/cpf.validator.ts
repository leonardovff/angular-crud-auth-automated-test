import { FormControl } from '@angular/forms';

export class CpfValidator {
  static valid(control: FormControl) {
    if (!control.value) return null;
    if (CpfValidator.valid_cpf(control.value)) {
      return null;
    }
    return {
      validateEmail: {
        valid: false
      }
    }
  }

  static valid_cpf(cpf) {
    if (cpf) {
      cpf = cpf.replace(/[^\d]+/g, '');

      if ((cpf === '00000000000') ||
        (cpf === '11111111111') ||
        (cpf === '22222222222') ||
        (cpf === '33333333333') ||
        (cpf === '44444444444') ||
        (cpf === '55555555555') ||
        (cpf === '66666666666') ||
        (cpf === '77777777777') ||
        (cpf === '88888888888') ||
        (cpf === '99999999999')) {
        return false
      }

      if (cpf.length < 11) {
        return false;
      }

      const c = cpf.substr(0, 9);
      const dv = cpf.substr(9, 2);
      let d1 = 0;

      for (let i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i);
      }
      if (d1 === 0) {
        return false;
      }

      d1 = 11 - (d1 % 11);
      if (d1 > 9) {
        d1 = 0;
      }
      if (dv.charAt(0) !== d1.toString()) {
        return false;
      }

      d1 *= 2;
      for (let i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i);
      }
      d1 = 11 - (d1 % 11);
      if (d1 > 9) {
        d1 = 0;
      }
      if (dv.charAt(1) !== d1.toString()) {
        return false;
      }

      return true;
    }
  }
}
