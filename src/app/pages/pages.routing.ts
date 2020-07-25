import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/auth.guard'
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraphicComponent} from './graphic/graphic.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      {path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de Progreso'}},
      {path: 'graphic', component: GraphicComponent, data: { titulo: 'Gráficas'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta'}},
      {path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
      {path: 'profile', component: PerfilComponent, data: { titulo: 'Perfil de Usuario'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
