import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {

  @Input()
  private control: AbstractControl;
  error: string = null;
  private readonly errorMessages = {
    'required': () => 'Campo é obrigatório',
    'minlength': (params) => 'O tamanho mínimo de caracteres é ' + params.requiredLength,
    'maxlength': (params) => 'O tamanho máximo de caracteres é ' + params.requiredLength,
    'validateDate': () => 'Campo de data inválido',
    'validateCpf': () => 'Campo de CPF inválido',
    'validatePhone': () => 'Campo de telefone inválido'
  };
  ngOnInit(){
    this.control.valueChanges.subscribe(() => {
      return this.error = this.getError();
    });
  }
  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  getError() {
    if(!this.control.errors) return '';
    console.log(this.control.errors);
    let priorityError = Object.keys(this.errorMessages)
    .find(error => typeof this.control.errors[error] != 'undefined');
    return this.errorMessages[priorityError](this.control.errors[priorityError]);
  }
}
