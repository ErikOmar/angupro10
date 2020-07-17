import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() grafico: any = {
    'labels': [],
    'data':  [],
    'type': '',
    'leyenda': 'Sin Titulo'
  }

  constructor() { }

  ngOnInit(): void {
  }
  public colors: Color[] = [
    {backgroundColor: [ '#ECDBB2','#989719','#D77921']}
  ]

}
