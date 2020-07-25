import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CargarImagenService } from 'src/app/services/cargar-imagen.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any =null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private cargarImagenService: CargarImagenService) {
    this.usuario = usuarioService.usuraio;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {

    this.usuarioService.actualizarPeril(this.profileForm.value)
      .subscribe((resp: any) => {
        const { nombre, email } = resp.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Usuario actualizado','success');
      }, err => Swal.fire('Error', err.error.msg,'error'));
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if(!file) {return this.imgTemp = null;}

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }
  }

  subirImagen() {
    this.cargarImagenService
      .actualizarForo(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img
        Swal.fire('Usuario', 'Imagen actualizada','success');
      } ).catch(err => {
        Swal.fire('Error', 'No se uso subir la imagen','error');
      })

  }
}
