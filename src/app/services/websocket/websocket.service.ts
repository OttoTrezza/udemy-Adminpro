import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../../models/usuario.model';
// import { Router } from '@angular/router';



@Injectable()
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;
  // router: any;

  constructor(
    private socket: Socket,
    // private _usuario: Usuario
    // private router: Router
  ) {
    // this.cargarStorage();
   this.checkStatus();
  }


    checkStatus() {

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
      });
        this.emit('entrarChat', this.usuario, function(resp) {
        console.log('Usuarios conectados', resp);
       // this.cargarStorage();
      });

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

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }

    loginWS( nombre: string, sala: string ) {

      const payload = {
        nombre,
        sala
      };
      this.emit('conectarCliente', payload, (resp) => {

        this.usuario = resp;
        this.guardarStorage();

      });

    }


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
        this.loginWS( this.usuario.nombre, this.usuario.sala );
      }

    }

}



// loginWS( nombre: string, sala: string ) {

//   return new Promise(  (resolve, reject) => {

//     this.emit( 'configurar-usuario', { nombre, sala }, resp => {

//       this.usuario.nombre = nombre;
//       this.usuario.sala = sala;
//       this.guardarStorage();

//       resolve();

//     });

//   });

//   }
