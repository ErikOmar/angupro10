import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }
  
  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {path: '/dashboard', titulo: 'Main'},
  //       {path: '/dashboard/progress', titulo: 'Progres Bar'},
  //       {path: '/dashboard/graphic', titulo: 'Graficas'},
  //       {path: '/dashboard/promises', titulo: 'Promesas'},
  //       {path: '/dashboard/rxjs', titulo: 'RxJs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {path: '/dashboard/usuarios', titulo: 'Usuarios'},
  //       {path: '/dashboard/hospitales', titulo: 'Hospitales'},
  //       {path: '/dashboard/medicos', titulo: 'Medicos'},
  //     ]
  //   }
  // ]

  constructor() { }
}
