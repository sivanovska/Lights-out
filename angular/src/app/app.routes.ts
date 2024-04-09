import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMatrixComponent } from './components/create-matrix/create-matrix.component';
import { MatrixComponent } from './components/matrix/matrix.component';


export const routes: Routes = [
  { path: 'create', component: CreateMatrixComponent },
  { path: 'play', component: MatrixComponent },
  { path: '', redirectTo: '/play', pathMatch: 'full' }, // Default route

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }