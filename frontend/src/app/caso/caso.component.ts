import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const casos_query = gql`
query {
  casos {
    id
    enfermedad
    descripcion
    pacientes {
      id
      nombre
    }
    fechaEntrada
    fechaSalida
    habitacion
  }
}
`;
@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css']
})
export class CasoComponent implements OnInit {

  page = 0;
  casos: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: casos_query,
      variables: { offset: 100 * this.page }
    });

    this.query.valueChanges.subscribe(result => {
      this.casos = result.data && result.data.casos ;
      console.log(this.casos)
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
  refresh() {
    this.query.refetch();
  }
}
