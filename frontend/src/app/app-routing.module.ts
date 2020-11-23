import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from  './home/home.component';
import {CasoComponent} from  './caso/caso.component';
import {PacienteComponent} from  './paciente/paciente.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'caso',
    component: CasoComponent
  },
  {
    path: 'paciente',
    component: PacienteComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
