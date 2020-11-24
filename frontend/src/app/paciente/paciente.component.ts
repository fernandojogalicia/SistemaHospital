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
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  page = 0;
  pacientes: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: pacientes_query,
      variables: { offset: 100 * this.page }
    });

    this.query.valueChanges.subscribe(result => {
      this.pacientes = result.data && result.data.pacientes;
    });
  }

  update() {
    this.query.refetch({ offset: 100 * this.page });
  }

  nextPage() {
    this.page++;
    this.update();
  }

  prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }

}
