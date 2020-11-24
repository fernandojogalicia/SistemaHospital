import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const pacientes_query = gql`
query pacientes {
  pacientes {
    id
    nombre
    edad
    telefono
    direccion
  }
}
`;

const crear_caso_query = gql`
mutation createCaso(
  $enfermedad: String,
  $descripcion : String,
  $paciente : ID,
  $fechaEntrada : Date,
  $fechaSalida : Date,
  $habitacion : String,
) {
  createCaso(input: {
    enfermedad:$enfermedad,
    descripcion:$descripcion,
    pacientes: [
      {
        id:$paciente
      }
    ],
    fechaEntrada:$fechaEntrada,
    fechaSalida:$fechaSalida,
    habitacion:$habitacion,
  }) {
    ok
  }
}
`;
@Component({
  selector: 'app-form-caso',
  templateUrl: './form-caso.component.html',
  styleUrls: ['./form-caso.component.css']
})
export class FormCasoComponent implements OnInit {
  page = 0;
  caso = {
    enfermedad : "",
    descripcion : "",
    paciente : 0,
    fechaEntrada : "",
    fechaSalida : "",
    habitacion : ""
  }

  pacientes: any[] = [];
  private query: QueryRef<any>;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: pacientes_query,
      variables: { offset: 100 * this.page }
    });

    this.query.valueChanges.subscribe(result => {
      this.pacientes = result.data && result.data.pacientes;
    });
  }

  guardar() {
    this.caso.paciente = parseInt(this.caso.paciente.toString())
    console.log(this.caso)
    this.apollo.mutate({
      mutation: crear_caso_query,
      variables: {
        enfermedad: this.caso.enfermedad,
        descripcion: this.caso.descripcion,
        paciente: this.caso.paciente,
        fechaEntrada: this.caso.fechaEntrada,
        fechaSalida: this.caso.fechaSalida,
        habitacion: this.caso.habitacion,
      }
    }).subscribe(data => {
      console.log('New post created!', data);
    });
  }
}
