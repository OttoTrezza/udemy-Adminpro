import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Usuario } from '../../models/usuario.model';

// import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
// import { stringify } from 'querystring';
import { Socket } from 'ngx-socket-io';





@Injectable()
export class WebsocketService {
  public router: Router;
  public socketStatus = false;
  public usuario: Usuario = null;
  public usuarios: Usuario[] = null;
  public _usuarioService: UsuarioService;
  // router: any;


  constructor(
    public socket: Socket
  ) {
     this.checkStatus();
     this.cargarStorage();
    //  const paylo = {
    //   nombre: this._usuarioService.usuario.nombre,
    //   sala: this._usuarioService.usuario.sala,
    //   img: this._usuarioService.usuario.img
    // };
    }


    checkStatus() {

      this.socket.on('connect', () => {
        console.log('Conectado al servidor111');
        this.socketStatus = true;
        this.cargarStorage();
//         this.socket.emit('connect', this.usuario, () => {
// console.log('Conected');
//         });
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
        this.socketStatus = false;
        // this.emit('disconnect', () => {
        // console.log('Ahora si desconectado');
        //  });
      });
    }
    emit( evento: string, payload?: any, callback?: Function ) {

      console.log('Emitiendo', evento);

      this.socket.emit( evento, payload, callback );

    }
    entrarChat( nombre: string, sala: string, img: string) {

      return new Promise(  (resolve, reject) => {
        const payl = {
          nombre: nombre,
          sala: sala,
          img: img
        };
        this.emit('entrarChat', payl, () => {
          // this.usuario = new Usuario( nombre, this._usuarioService.usuario.email, this._usuarioService.usuario.password, sala, );
          // this.usuario.sala = sala;
          // this.guardarStorage();
        console.log('usuarios');
        });
          resolve();
      });
    }


    logoutWS() {
      this.emit('disconnect', () => {});
      this.usuario = null;
      localStorage.removeItem('usuario');

      this.checkStatus();
      this.router.navigate(['login']);

    }

    getUsuario() {
      return this.usuario;
    }

    cargarStorage() {

      if ( localStorage.getItem('usuario') ) {
        this.usuario = JSON.parse( localStorage.getItem('usuario') );
        console.log('Conectado.. entrando al chat..WSservice');
       this.entrarChat(this.usuario.nombre, this.usuario.sala, this.usuario.img);
      }

    }

    listen( evento: string ) {
    //  console.log('escuchando', this.socket.fromEvent(evento) );

      return this.socket.fromEvent( evento );
    }
}
