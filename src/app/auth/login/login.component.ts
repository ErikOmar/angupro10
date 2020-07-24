import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  public auth2: any;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private usuraioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.renderButton();

    this.email = localStorage.getItem('email') || '';
    this.loginForm.controls['email'].setValue(this.email);

    if (this.email !== '') {
      this.loginForm.controls['remember'].setValue(true);
    }
  }

  ingresar() {

    this.usuraioService.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
      );

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.renderButton();
  }

  async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '291255388235-bgoc8rcqtakfq1vs88lnk87e0pmgrvt0.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //   });

    await this.usuraioService.googleInit();
    this.auth2 = this.usuraioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
    // });
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);

        this.usuraioService.loginGoogle(id_token)
          .subscribe(resp => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          }, (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          });

      }, (error) => {
        Swal.fire('Error', JSON.stringify(error, undefined, 2), 'error');
      });
  }
}
