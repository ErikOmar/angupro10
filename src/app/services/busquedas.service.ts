import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultadps: any[]): Usuario[] {
    
    return resultadps.map( user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid));
  }

  private transformarHospitales( resultadps: any[]): Hospital[] {
    
    return resultadps;
  }

  private transformarMedicos( resultadps: any[]): Medico[] {
    
    return resultadps;
  }

  buscar( tipo: 'Usuarios'|'Medicos'|'Hospitales', termino: string) {

    const url = `${base_url}/busquedas/coleccion/${tipo}/${termino}`;
    return this.http.get(url,this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'Usuarios':
              return this.transformarUsuarios(resp.resultados);           
            break;
            case 'Hospitales':
              return this.transformarHospitales(resp.resultados);           
            break;
            case 'Medicos':
              return this.transformarMedicos(resp.resultados);           
            break;
          default:
            return [];
            break;
        }
      })
    );
  }
}
