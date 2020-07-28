import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { MedicoService } from '../../../services/medico.service'
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;


  constructor(private medicoService: MedicoService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscarMedicos( nombre: string){
    this.cargando=true;

    if(nombre.length === 0){
      return this.cargarMedicos();
    }

    if(nombre.length > 1){
      this.busquedasService.buscar('Medicos', nombre)
      .subscribe( (resp : any) => {
        this.medicos = resp;
      })
    }

    this.cargando = false;
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });
  }

  guardarCambios(medico: Medico) {
    console.log(medico);

    this.medicoService.actualizarMedico(medico)
      .subscribe(resp => {
        Swal.fire('Actualizado', medico.nombre, 'success');
      })
  }

  eliminarMedico(medico: Medico) {
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Esta a punto de borrar a ${medico.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.value) {

          this.cargarMedicos();

          this.medicoService.eliminarMedico( medico.uid)
          .subscribe( resp => {
            Swal.fire(
              'Borrado!',
              `El medico ${medico.nombre}, ha sido borrado.`,
              'success'
            )
          })

        }
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid, medico.img);
  }

}
