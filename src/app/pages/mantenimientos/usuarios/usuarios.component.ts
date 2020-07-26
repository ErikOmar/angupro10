import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public paginaActual: number = 0;
  public cargando: boolean = true;

  // Si injecto con private solo lo puedosar en el ts y no en html solo los public se pueden usar en el html
  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginaActual)
    .subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
    });
    this.cargando = false;
  }

  cambiarPagina( valor:number ) {
    this.paginaActual += valor;

    if(this.paginaActual <0){
      this.paginaActual = 0;
    } else if(this.paginaActual > this.totalUsuarios){
      this.paginaActual -= valor;
    }

    this.cargarUsuarios();
  }

    buscar( termino: string){
      if(termino.length <= 2){
        return this.usuarios = this.usuariosTemp;
      }
        this.busquedasService.buscar('Usuarios', termino).subscribe(resp => {
          this.usuarios = resp
        });         
    }

    eliminarUsuario( usuario: Usuario) {
      if(usuario.uid === this.usuarioService.uid){
        return Swal.fire(
                  'Error!',
                  `No se puede borrar el usuario logeado.`,
                  'error'
                );
      }

      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.value) {

          this.cargarUsuarios();

          this.usuarioService.eliminarUsuario( usuario.uid)
          .subscribe( resp => {
            Swal.fire(
              'Borrado!',
              `El usuario ${usuario.nombre}, ha sido borrador.`,
              'success'
            )
          })

        }
      })
      
    }

    cambiarRole( usuario: Usuario ) {
     
      return this.usuarioService.actualizarUsuario(usuario)
        .subscribe();
    }

    abrirModal( usuario: Usuario){
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }
}
