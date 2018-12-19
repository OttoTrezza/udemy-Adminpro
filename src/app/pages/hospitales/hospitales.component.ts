import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

import swal from 'sweetalert';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {
hospital: Hospital;
  hospitales: Hospital[] = [];
  desde: number = 0;


  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );

  }



  cargarHospitales() {
    this._hospitalService.cargarHospitales( )
          .subscribe( (resp: any) => {
            this.totalRegistros = resp.total;
            this.hospitales = resp.hospitales;
            this.cargando = false;
          });
    }



  crearHospital() {
    swal({
      title: 'Ingrese nuevo nombre:',
      text: 'Ingrese el nombre del hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre de hospital'
        }
      },
      buttons: ['Mejor no!', true]
    })
          .then((value) => {
      if (!value) {
        return;
      }
      let hospital = new Hospital (value) ;
      this._hospitalService.crearHospital(hospital)
      .subscribe(() => this.cargarHospitales() );
    });
  }



  buscarHospital( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
              .subscribe((hospitales: Hospital[]) => {
                this.totalRegistros = null;
                this.hospitales = hospitales;
                this.cargando = false;
              });
  }



  cambiarNombre( hospital: Hospital ) {
    swal({
      title: 'Nombre hospital:',
      text: 'CAMBIAR A',
      content: {
        element: 'input',
        attributes: {
          value: hospital.nombre
        }
      },
      buttons: ['Mejor no!', true]
    })
          .then((value) => {
      if (!value) {
        return;
      }
      hospital.nombre = value;
    });

    // this._hospitalService.actualizarHospital(hospital)
    //       .subscribe();
  }



  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital( hospital )
          .subscribe(() => this.cargarHospitales() );
  }



  borrarHospital( hospital: Hospital) {
    this._hospitalService.borrarHospital( hospital._id)
          .subscribe(() => this.cargarHospitales() );
  }



  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }



  cambiarDesde(valor: number ) {

    let desdeh = JSON.parse( localStorage.getItem('desdeh')) + valor;

    if ( desdeh >= this.totalRegistros) {
      return;
    }
    if (desdeh < 0) {
      return;
    }

    this._hospitalService.guardardesdeStorage( desdeh );
    this.cargarHospitales();
  }

}
