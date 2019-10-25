import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { HttpClient } from '@angular/common/http';
// import { URL_SERVICIOS } from '../../config/config';
// import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class ChatService {
name: string;
img: string;
  constructor(
    public wsService: WebsocketService,
    public http: HttpClient,

    ) { }

    sendMessage( mensaje: string, callback: any ) {
      this.name = this.wsService.getUsuario().nombre;
      this.img = this.wsService.getUsuario().img;
      console.log('chatS.sendmessage name,img', this.name, this.img);
      const payload = {
        de: this.name,
        cuerpo: mensaje,
        img: this.img
        };
      this.wsService.emit( 'mensaje' , payload, (resp: any) => {
        callback(resp);
       // console.log(resp);
      });
      console.log('Mensaje', payload );
      }

    getMessages1() {
       return this.wsService.listen( 'mensajeDeServidor' );
      }

    getMessages() {
        return this.wsService.listen( 'mensaje-nuevo' );
    }

    getUsuariosActivos() {
        return this.wsService.listen( 'usuarios-activos' );
    }

    getSalasActivas() {
        return this.wsService.listen( 'salas-activas' );
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
      this.wsService.logoutWS();
    }

}
