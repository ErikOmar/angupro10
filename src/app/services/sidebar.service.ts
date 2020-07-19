import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {path: '/dashboard', titulo: 'Main'},
        {path: '/dashboard/progress', titulo: 'Progres Bar'},
        {path: '/dashboard/graphic', titulo: 'Graficas'},
        {path: '/dashboard/promises', titulo: 'Promesas'},
        {path: '/dashboard/rxjs', titulo: 'RxJs'},
      ]
    }
  ]

  constructor() {}
}
