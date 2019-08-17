import { FormControl } from '@angular/forms';
import { min } from 'rxjs/operators';

export class ValidatePhone {
  static valid(control: FormControl) {
    if (!control.value) return null;
    return ValidatePhone.valid_cell_phone(control.value)
      ? null
      : {
        validateCellPhone: {
          valid: false
        }
      };
  }
  static valid_cell_phone(number) {
    if (number == "") {
      return false;
    }
    const ZIP_CELL_PHONE = /^[(][1-9][0-9][)]?[ ]?[9][5-9][0-9]{3}?[-]?[0-9]{4}$/;
    const ZIP_PHONE = /^[(][1-9][0-9][)]?[ ]?[2-6][0-9]{3}?[-]?[0-9]{4}$/;
    const dddState = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31,
      32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51,
      53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75,
      77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99
    ];
    const dddPhone = parseInt(number.slice(0, 4).replace(/[)(]/g, '')),
      phoneWithoutDDD = number.slice(3, number.length).replace(/[^\d]+/g, "");

    if (dddState.indexOf(dddPhone) == -1) {
      return false;
    }

    //is home phone or is cell phone without first number (9)
    if (phoneWithoutDDD.length == 8) {

      //check if is home phone
      if (!ZIP_PHONE.test(number)) {
        return false;
      }
    } else if (phoneWithoutDDD.length == 9) {
      // check if is cell phone
      if (!ZIP_CELL_PHONE.test(number)) {
        return false;
      }
    } else {
      return false;
    }

    if (phoneWithoutDDD == "900000000" || phoneWithoutDDD == "999999999") {
      return false;
    }

    return true;
  }
}
