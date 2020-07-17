import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages.routing';
import {SharedModule} from '../shared/shared.module'
import {ComponentsModule} from '../components/components.module'



import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraphicComponent} from './graphic/graphic.component';
import {PagesComponent} from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule
  ], exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicComponent
  ]
})
export class PagesModule {}
