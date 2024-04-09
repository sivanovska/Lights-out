import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatrixComponent } from './components/matrix/matrix.component';
import { CreateMatrixComponent } from './components/create-matrix/create-matrix.component';
import { PageComponent } from './components/page/page.component';

import { AppRoutingModule } from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatrixComponent,
    CreateMatrixComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
