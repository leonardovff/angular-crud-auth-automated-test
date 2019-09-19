import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/components/show-message/show-message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/validators/cpf.validator';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private message: ShowMessageService) {
    this.form = new FormGroup({
      cpf: new FormControl(null, [
        Validators.required,
        CpfValidator.valid
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(9)
      ])
    });
  }

  ngOnInit() { }

  save() { }
}
