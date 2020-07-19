import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => console.log(usuarios));

  }

  getUsuarios() {

    return new Promise(resolve => {

      fetch('https://reqres.in/api/users?page=2')
        .then((res) => {
          return res.json(); // Aqui es como la conexion y la forma en la que regresa los datos
        })
        .then((body) => {
          resolve(body.data); // aqui ya estan los datos
        })
        .catch((error) => {
          console.log(error);
        });

    });
  }

}
