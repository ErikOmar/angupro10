import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hosiptales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['Hernando', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hid => {

        this.hospitalSeleccionado = this.hosiptales.find(h => h.id === hid);

      })
  }

  cargarMedico(id: string) {

    if( id === 'nuevo'){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(100)
    )
    .subscribe(medico => {
      
      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`);
      }

      const { nombre, hospital: { _id } } = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });

    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hosiptales = hospitales
      })
  }

  guardarMedico() {

   
    
    if(this.medicoSeleccionado){
      const data = {
        ...this.medicoForm.value,
        uid: this.medicoSeleccionado.uid
      }
      this.medicoService.actualizarMedico(data)
      .subscribe((resp: any) => {

        Swal.fire('Actualizado', 'Medico actualizado', 'success');

      });
    } else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
  
          Swal.fire('Creado', 'Medico creado', 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico.id}`)
        });
    }
  }

}
