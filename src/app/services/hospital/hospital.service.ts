import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor (
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
    }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }



  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.hospital = JSON.parse( localStorage.getItem('hospital'));
    } else {
        this.token = '';
        this.hospital = null;
      }
  }



  guardardesdeStorage( desdeh: number) {
    localStorage.setItem('desdeh', JSON.stringify( desdeh ));
  }



  guardarStorage( id: string, token: string, hospital: Hospital) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('hospital', JSON.stringify(hospital) );

    this.hospital = hospital;
    this.token = token;
  }

  cargarHospitales() {
    let desde = JSON.parse( localStorage.getItem('desdeh'));
    let url = URL_SERVICIOS + 'hospital?desde=' + desde;
    return this.http.get( url );
  }



  crearHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + 'hospital';
    url += '/?token=' + this.token;
    return this.http.post( url, hospital)
                        .map((resp: any) => {
                          swal('Hospital creado', hospital.nombre, 'success');
                        return resp.hospital; // resp.hospital
                        });
  }



  buscarHospitales( termino: string ) {
    let url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
          .map((resp: any) => resp.hospitales );
    }



  actualizarHospital( hospital: Hospital) {

      let url = URL_SERVICIOS + 'hospital/' + hospital._id;
      url += '?token=' + this.token;
      return this.http.put( url, hospital)
                .map((resp: any) => {
                    let hospitalDB: Hospital = resp.hospital;
                    this.guardarStorage( hospitalDB._id, this.token, hospitalDB );
                  swal('Hospital actualizado', hospital.nombre, 'success');

                  return true;
                });
    }



  borrarHospital( id: string ) {
      let url = URL_SERVICIOS + 'hospital/' + id;
      url += '?token=' + this.token;
      return this.http.delete( url )
          .map( resp => {
            swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
            return true;
            });

    }// .map( () => swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success'));



  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo( archivo, 'hospitales', id)
          .then( (resp: any ) => {
            this.hospital.img = resp.hospital.img;
            swal('Imagen Actualizada', this.hospital.nombre, 'success');
            this.guardarStorage( id, this.token, this.hospital);
          })
          .catch( resp => {
            console.log( resp );
          });
  }
  obtenerHospital( id: string) {
    let url = URL_SERVICIOS + 'hospital/' + id;
    return this.http.get( url )
          .map((resp: any) => resp.hospital );
  }

}
