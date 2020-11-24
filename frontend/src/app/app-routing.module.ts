import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from  './home/home.component';
import {CasoComponent} from  './caso/caso.component';
import {PacienteComponent} from  './paciente/paciente.component';
import {FormCasoComponent} from  './form-caso/form-caso.component';
import {FormPacienteComponent} from  './form-paciente/form-paciente.component';
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
  },
  {
    path: 'form/caso',
    component: FormCasoComponent
  },
  {
    path: 'form/paciente',
    component: FormPacienteComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
