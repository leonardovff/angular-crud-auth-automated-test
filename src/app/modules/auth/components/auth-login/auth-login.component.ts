import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/components/show-message/show-message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/validators/cpf.validator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public form: FormGroup;

  constructor(public message: ShowMessageService, private authService: AuthService) {
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

  ngOnInit() { console.log('on init')}

  save() {
    console.log('chamou save');
    this.authService.authenticate(this.form.value)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        this.message.show('Erro ao fazer login', 2000);
        console.log('here1221', error);
      });
  }
}
