import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientViewComponent } from './components/client-view/client-view.component';


const routes: Routes = [
  {
    path: '',
    component: ClientListComponent
  },
  {
    path: ':id',
    component: ClientViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
