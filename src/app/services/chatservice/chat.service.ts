import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
// import { HttpClient } from '@angular/common/http';
// import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs-compat/operator/map';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
@Injectable()
export class ChatService {
name: string;
img: string;

  constructor(
    public wsService: WebsocketService,
    // public http: HttpClient,
    public usuarioService: UsuarioService,
    public router: Router
    ) { }

      sendMessage( mensaje: string, sala: string, callback: any ) {
        this.name = this.usuarioService.usuario.nombre;
      this.img = this.usuarioService.usuario.img;
      // this.name = this.wsService.getUsuario().nombre;
      // this.img = this.wsService.getUsuario().img;
      console.log('name img', this.name, this.img);
      const payload = {
        de: this.name,
        cuerpo: mensaje,
        img: this.img,
        sala: sala
        };
      this.wsService.emit( 'mensaje' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      console.log('Mensaje', payload );
      }
      sendFrecuencia( frecuencia: number, sala: string, callback: any ) {
        this.name = this.usuarioService.usuario.nombre;
      // this.name = this.wsService.getUsuario().nombre;
      const payload = {
        de: this.name,
        frec: frecuencia,
        sala: sala
        };
      this.wsService.emit( 'frecuencia' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      }
      sendLongPulse( LongPulse: number, sala: string, callback: any ) {
        this.name = this.usuarioService.usuario.nombre;
      // this.name = this.wsService.getUsuario().nombre;
      const payload = {
        de: this.name,
        LongP: LongPulse,
        sala: sala
        };
      this.wsService.emit( 'LongPulse' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      }
      sendDir( dir: number, sala: string, callback: any ) {
        this.name = this.usuarioService.usuario.nombre;
      // this.name = this.wsService.getUsuario().nombre;
      const payload = {
        de: this.name,
        dir: dir,
        sala: sala
        };
      this.wsService.emit( 'dir' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      }
      sendSen( sen: number, sala: string, callback: any ) {
        this.name = this.usuarioService.usuario.nombre;
      // this.name = this.wsService.getUsuario().nombre;
      const payload = {
        de: this.name,
        sen: sen,
        sala: sala
        };
      this.wsService.emit( 'sen' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      }
    getMessages1() {
       return this.wsService.listen( 'mensajeDeServidor' );
      }

    getMessages() {
        return this.wsService.listen( 'mensaje-nuevo' );
    }
    getMessagesp() {
      return this.wsService.listen( 'mensajesp-nuevo' );
  }

    getUsuariosActivos() {
        return this.wsService.listen( 'usuarios-activos' );
    }

    getSalasActivas() {
        return this.wsService.listen( 'salas-activas' );
    }
    getSalas() {
      return this.wsService.listen( 'salas' );
  }
  getRGB() {
    return this.wsService.listen( 'rgb-servidor-esp' );
}

    focusBuscar(nombre: string) {
    // focus en la lista de usuarios del mensajesComponent.html
    }

    emitirUsuariosActivos(sala: string) {
      this.wsService.emit( 'obtener-usuarios', sala, (entro: boolean) => {
        if (entro === true) {
          console.log('Server:petición recibida');
        } else {
            console.log('Sin respuesta del servidor');
          }
        });
    }
    emitirSalasActivas() {
      this.wsService.emit( 'obtener-salas', (entro: boolean) => {
        if (entro === true) {
          console.log('Server:petición recibida');
        } else {
            console.log('Sin respuesta del servidor');
        }
      });
    }
    loginChatS(nombre: string, sala: string, img: string) {
      this.wsService.entrarChat(nombre, sala, img);
    }
    logoutChatS() {
      this.router.navigate(['login']);
      this.wsService.logoutWS();
    }

}
