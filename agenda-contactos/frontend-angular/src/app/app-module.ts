import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app'; 
import { CategoriasComponent } from './categorias/categorias'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    AppComponent,           // ✅ Importar directamente el componente standalone
    CategoriasComponent     // ✅ Importar directamente el componente standalone
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }