import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
// import { ImagenPipe } from '../../pipes/imagen.pipe';
import swal from 'sweetalert';



@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }



  cargarMedico() {
  let desde = JSON.parse( localStorage.getItem('desdem'));
  let url = URL_SERVICIOS + 'medico?desde=' + desde;

  return this.http.get( url )
        .map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
        });
  }


  guardardesdeStorage( desdem: number) {
    localStorage.setItem('desdem', JSON.stringify( desdem ));
    console.log(desdem);
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + 'medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
          .map( resp => {
            swal('Medico Borrado', 'Medico Borrado correctamente', 'success');
            return resp;
          });
  }
  guardarMedico( medico: Medico) {
  let url = URL_SERVICIOS + 'medico';

  if (medico._id) {
    // actualizando
    url += '/' + medico._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, medico )
          .map( (resp: any) => {
            swal('Medico Actualizado', medico.nombre, 'success');
            return resp.medico;
          });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico )
            .map((resp: any) => {
              swal('Medico Creado', medico.nombre, 'success');
              return resp.medico;
            });
    }
  }
  cargarMedicoid( id: string) {
    let url = URL_SERVICIOS + 'medico/' + id;
    return this.http.get( url )
          .map( (resp: any) => resp.medico);
  }
  buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
          .map((resp: any) => resp.medicos );
    }

}
