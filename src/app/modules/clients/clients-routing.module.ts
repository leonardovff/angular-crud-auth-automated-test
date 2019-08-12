import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { ClientFormComponent } from './components/client-form/client-form.component';


const routes: Routes = [
  {
    path: '',
    component: ClientListComponent
  },
  {
    path: 'add',
    component: ClientFormComponent
  },
  {
    path: ':id/edit',
    component: ClientFormComponent
  },
  {
    path: ':id',
    component: ClientViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
