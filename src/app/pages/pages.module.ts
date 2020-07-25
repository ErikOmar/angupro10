import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages.routing';
import {SharedModule} from '../shared/shared.module'
import {ComponentsModule} from '../components/components.module'



import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraphicComponent} from './graphic/graphic.component';
import {PagesComponent} from './pages.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule
  ], exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {}
