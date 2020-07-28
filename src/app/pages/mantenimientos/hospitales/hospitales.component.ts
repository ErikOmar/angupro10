import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, 
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscarHospitales( nombre: string){
    this.cargando=true;

    if(nombre.length === 0){
      return this.cargarHospitales();
    }

    if(nombre.length > 2){
      this.busquedasService.buscar('Hospitales', nombre)
      .subscribe( resp => {
        this.hospitales = resp;
      })
    }

    this.cargando = false;
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);

    this.hospitalService.actualizarHospital(hospital.id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    console.log(hospital);

    this.hospitalService.eliminarHospital(hospital.id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      })
  }

  async abrirModalSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese nombre del nuevo hopital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe(
        (resp:any) => {

          this.hospitales.push(resp.hospital)

          Swal.fire('Creado', resp.hospital.nombre, 'success');
        }
      )
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital.id, hospital.img);
  }

}
