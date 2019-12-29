import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'clients',
    loadChildren:  () => import('./modules/clients/clients.module').then(mod => mod.ClientsModule)
  },
  {
    path: '',
    loadChildren:  () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
