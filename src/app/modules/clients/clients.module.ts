import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { ClientFormComponent } from './components/client-form/client-form.component';


@NgModule({
  declarations: [ClientListComponent, ClientViewComponent, ClientFormComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class ClientsModule { }
