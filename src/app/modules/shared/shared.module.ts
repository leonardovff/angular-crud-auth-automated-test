import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ListComponent } from './components/list/list.component'
import { ListItemComponent } from './components/list/list-item/list-item.component'
import { RouterModule } from '@angular/router';
import { ClientInterceptor } from './interceptors/client.interceptor';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { BirthDateMaskDirective } from './directives/birth-date-mask.directive';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { UserInterceptor } from './interceptors/user.interceptor';


@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    CpfMaskDirective,
    PhoneMaskDirective,
    BirthDateMaskDirective,
    InputErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    ListComponent,
    ListItemComponent,
    CpfMaskDirective,
    PhoneMaskDirective,
    BirthDateMaskDirective,
    InputErrorComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
