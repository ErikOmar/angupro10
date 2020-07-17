import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() titulo: string = "Incrementador";
  @Input() progreso: number = 10;
  @Input() btnClass: string = 'btn-primary';

  @Output() valor: EventEmitter<number> = new EventEmitter()

  constructor() {}

  ngOnInit(): void {
    this.btnClass= `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    this.progreso += valor;

    if (this.progreso <= 0) {
      this.progreso = 0;
    } else if (this.progreso >= 100) {
      this.progreso = 100;
    }

    this.valor.emit(this.progreso);
  }

  onChange( event: number ){
    
    if (event <= 0) {
      this.progreso = 0;
    } else if (event >= 100) {
      this.progreso = 100;
    } else {
      this.progreso = event;
    }

    this.valor.emit(this.progreso);
  }

}
