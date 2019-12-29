import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLoginComponent } from './components/auth-login/auth-login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLoginComponent
  },
  // {
  //   path: 'add',
  //   component: ClientFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
