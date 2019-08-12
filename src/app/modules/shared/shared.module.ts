import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ListComponent } from './components/list/list.component'
import { ListItemComponent } from './components/list/list-item/list-item.component'
import { RouterModule } from '@angular/router';
import { ClientInterceptor } from './interceptors/client.interceptor';
import { CpfMaskDirective } from './directives/cpf-mask.directive';


@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    CpfMaskDirective
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
    CpfMaskDirective
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
