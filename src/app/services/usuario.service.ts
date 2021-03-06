import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form-interfase';
import { LoginForm } from '../interfaces/login-form-interfase';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfase';

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

  get role(): string {
    return this.usuraio.role;
  }

  get uid(): string {
    return this.usuraio.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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

        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuraio = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);

        return true;

      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        }));
  }

  eliminarUsuario(uid: string) {
    //usuarios/5f160f5dce63672cb80a3e14
    const url = `${base_url}/usuarios/${uid}`;
    return this.http.delete(url, this.headers);
  }

  actualizarPeril(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuraio.role || 'USER_ROLE'
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  actualizarUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

  login(formData: LoginForm) {

    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  loginGoogle(googleToken: string) {

    return this.http.post(`${base_url}/login/google`, { googleToken })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(
      url,
      this.headers).pipe(
        map(resp => {
          const usuarios = resp.usuarios
            .map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid))
          return {
            total: resp.total,
            usuarios
          };
        })
      );

  }
}
