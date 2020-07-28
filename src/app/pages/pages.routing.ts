import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/auth.guard'
import {AdminGuard} from '../guards/admin.guard'
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraphicComponent} from './graphic/graphic.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {PerfilComponent} from './perfil/perfil.component';
import {UsuariosComponent} from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Barra de Progreso'}},
      {path: 'graphic', component: GraphicComponent, data: {titulo: 'Gráficas'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
      {path: 'promises', component: PromisesComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
      {path: 'profile', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'}},
      {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda Global'}},

      // Mantenimientos
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
      {path: 'medicos/:id', component: MedicoComponent, data: {titulo: 'Medicos'}},
      
      // Rutas ADmin
      {path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent, data: {titulo: 'Usuarios'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
