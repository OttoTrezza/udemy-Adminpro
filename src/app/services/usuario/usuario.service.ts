import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  usuarios: Usuario[] = [];
  token: string;
  menu: any = [];
  // public tipo: string = 'usuario';
  constructor (
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public wsService: WebsocketService
    ) {
    this.cargarStorage();
  }

  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken' ;
    url += '?token=' + this.token;
    return this.http.get( url )
            .map( (resp: any) => {
              this.token = resp.token;
              localStorage.setItem('token', this.token );
              console.log('token renovado');

              return true;
            })
            .catch( err => {
              this.router.navigate(['/login']);
                swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error');
                return Observable.throw( err );
            });
  }
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }



  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
        this.token = '';
        this.usuario = null;
        this.menu = [];
      }
  }



  guardardesdeStorage( desdeu: number) {
    localStorage.setItem('desdeu', JSON.stringify( desdeu ));
  }



  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  // console.log(resp);

                  return true;
                });
  }


  login( usuario: Usuario, recordar: boolean = false) {

   // this.usuario.sala = 'JUEGOS';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                  .map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  //   this.wsService.loginWS( resp.usuario.nombre, resp.usuario.sala )
                  //   .then( (respu) => {
                  //      console.log('UsuarioService, login', respu);
                  //  });
                    return true;
                  })
                  .catch( err => {
                  swal( 'Error en el Login', err.error.mensaje, 'error');
                  return Observable.throw( err );
                  });
  }



  cargarUsuarios() {
    let desde = JSON.parse( localStorage.getItem('desdeu'));
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }
  cargarUsuariosTodos() {
    let url = URL_SERVICIOS + '/usuario?';
    return this.http.get( url );
  }


  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario)
                        .map((resp: any) => {
                          swal('Usuario creado', usuario.email, 'success');
                        return resp.usuario;
                        })
                        .catch( err => {
                          swal( 'Error', err.error.mensaje, err.error.errors.message, 'error');
                          return Observable.throw( err );
                          });
  }


  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
           .map((resp: any) => resp.usuarios );
  }



  actualizarUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario)
              .map((resp: any) => {

                if ( usuario._id === this.usuario._id) {
                   let usuarioDB: Usuario = resp.usuario;
                   this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
                }
                swal('Usuario actualizado', usuario.nombre, 'success');
                return true;
              });
  }


  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
          .map( resp => {
            swal('Usuario borrado', 'El ussuario ha sido eliminado correctamente', 'success');
            return true;
          });
   }



  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios' , id )
          .then( (resp: any ) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage( id, this.token, this.usuario, this.menu);
          })
          .catch( resp => {
            console.log( resp );
          });
  }
  obtenerUsuario( id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    return this.http.get( url )
          .map((resp: any) => resp.usuario );
  }

}
