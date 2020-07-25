import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form-interfase';
import { LoginForm } from '../interfaces/login-form-interfase';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuraio: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    // this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuraio.uid || '';
  }

  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '916876848538-v4fefic7oveh5e4b6iek9tok11h54f9o.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
  }

  validarToken() {
  
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const {email, google, nombre, role, img, uid} = resp.usuario;
        this.usuraio = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);

        return true;

      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => localStorage.setItem('token', resp.token))
    );
  }

  actualizarPeril( data: {email:string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuraio.role || 'USER_ROLE'
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }});
  }

  login(formData: LoginForm) {

    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token))
      );
  }

  loginGoogle(googleToken: string) {

    return this.http.post(`${base_url}/login/google`, { googleToken })
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token))
      );
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }
}
