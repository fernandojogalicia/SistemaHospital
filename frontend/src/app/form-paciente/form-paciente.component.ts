import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const crear_paciente_query = gql`
mutation createPaciente(
  $nombre: String,
  $edad : Int,
  $telefono : String,
  $direccion : String,
) {
  createPaciente(input: {
    nombre:$nombre,
    edad:$edad,
    telefono:$telefono,
    direccion:$direccion,
  }) {
    ok
  }
}
`;
@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {
  paciente = {
    nombre : "",
    edad : 0,
    telefono : "",
    direccion : ""
  }

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
  }
  guardar() {
    this.apollo.mutate({
      mutation: crear_paciente_query,
      variables: {
        nombre: this.paciente.nombre,
        edad: this.paciente.edad,
        telefono: this.paciente.telefono,
        direccion: this.paciente.direccion
      }
    }).subscribe(data => {
      console.log('New post created!', data);
    });
  }
}
