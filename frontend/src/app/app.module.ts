import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PacienteComponent } from './paciente/paciente.component';
import { CasoComponent } from './caso/caso.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormCasoComponent } from './form-caso/form-caso.component';
import { FormPacienteComponent } from './form-paciente/form-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PacienteComponent,
    CasoComponent,
    FormCasoComponent,
    FormPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
