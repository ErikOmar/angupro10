import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form-interfase';
import { LoginForm } from '../interfaces/login-form-interfase';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { ThemeService } from 'ng2-charts';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '291255388235-bgoc8rcqtakfq1vs88lnk87e0pmgrvt0.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => localStorage.setItem('token', resp.token)),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => localStorage.setItem('token', resp.token))
    );
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
