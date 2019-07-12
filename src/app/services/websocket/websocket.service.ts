import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../../models/usuario.model';

// import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';




@Injectable()
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;
  public usuarios: Usuario[] = null;
  public _usuarioService: UsuarioService;
  // router: any;

  constructor(
    private socket: Socket
    // private _usuario: Usuario
    // private router: Router
  ) {
     this.checkStatus();
     // this.cargarStorage();
    }


    checkStatus() {

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
        this.cargarStorage();
      });
      // this.entrarChat( this.usuario._id, this.usuario.nombre, this.usuario.sala );

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        this.socketStatus = false;
      });
    }


    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }
    entrarChat( nombre: string, sala: string ) {

      return new Promise(  (resolve, reject) => {

        this.emit('entrarChat', { nombre, sala }, (usuarios) => {
          this.usuarios = usuarios;
          // this.usuario = new Usuario( nombre, this._usuarioService.usuario.email, this._usuarioService.usuario.password, sala, );
          // this.usuario.sala = sala;
          // this.guardarStorage();
       // this.socket.on('usuarios-activos', (usuarios) => {
        console.log('usuarios', this.usuarios);
        });
          resolve();
      });
    }
    // loginWS(id: string, nombre: string, sala: string ) {

    //   return new Promise(  (resolve, reject) => {

    //     this.emit( 'connect', { id, nombre, sala }, resp => {

    //       // this.usuario = new Usuario( nombre, this._usuarioService.usuario.email, this._usuarioService.usuario.password, sala, );
    //       this.usuario.sala = sala;
    //       this.guardarStorage();

    //       resolve();

    //     });

    //   });

      // const payload = {
      //   nombre,
      //   sala
      // };
      // this.socket.emit('connect', payload, (resp: any) => {

      //   this.usuarios = resp;
      //   console.log('this.usuarios', this.usuarios);
      //   this.guardarStorage();

      // });
    // }


    logoutWS() {
      this.emit('disconnect', () => {
      this.usuario = null;
      localStorage.removeItem('usuario');
    });
    const payload = {
      nombre: 'sin-nombre'
    };
      this.emit('configurar-usuario', payload, () => {} );
      // this.router.navigateByUrl('');

    }

    getUsuario() {
      return this.usuario;
    }

    guardarStorage() {
      localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );
    }

    cargarStorage() {

      if ( localStorage.getItem('usuario') ) {
        this.usuario = JSON.parse( localStorage.getItem('usuario') );
       this.emit('entrarChat', this.usuario, () => {

       } );
      }

    }

    listen( evento: string ) {
    //  console.log('escuchando', this.socket.fromEvent(evento) );

      return this.socket.fromEvent( evento );
    }
}
