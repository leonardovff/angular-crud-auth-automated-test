import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { ShowMessageComponent } from './components/show-message/show-message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadersCssModule } from 'angular2-loaders-css';

@NgModule({
  declarations: [
    AppComponent,
    ShowMessageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadersCssModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
