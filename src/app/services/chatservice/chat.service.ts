import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { HttpClient } from '@angular/common/http';
// import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class ChatService {
name: string;
  constructor(
    public wsService: WebsocketService,
     public http: HttpClient,
  ) { }

    sendMessage( mensaje: string ) {
      this.name = this.wsService.getUsuario().nombre;
      const payload = {
        de: this.name,
        cuerpo: mensaje
        };
      this.wsService.emit( 'mensaje' , payload );
      console.log('Mensaje', payload );
      }
      // let url = 'http://localhost:3000' + '/mensajes/mensajes/';
      // return this.http.post( url, payload)
      //                     .map((resp: any) => {
      //                       swal('Mensaje enviado', payload.cuerpo, 'success');
      //                       console.log('mensajeenviado', resp.payload);
      //                     return resp.payload;
      //                     })
      //                     .catch( err => {
      //                       swal( 'Error', err.error.mensaje, err.error.errors.message, 'error');
      //                       return Observable.throw( err );
      //                       });

    getMessages1() {
      console.log('Recibido,getMes');
     // console.log('mensaje-nuevo recibido');
       return this.wsService.listen( 'mensajeDeServidor' );

      }
      getMessages() {
        console.log('Recibido,mens-nuevo');
       // console.log('mensaje-nuevo recibido');
         return this.wsService.listen( 'mensaje-nuevo' );

        }
    getMessagesPrivate() {
      console.log('Recibido, GetPriv');
      return this.wsService.listen( 'mensaje-privado' );
    }

    getUsuariosActivos() {
      console.log('Recibido UsuActivos');
      return this.wsService.listen( 'usuarios-activos' );
      }

    emitirUsuariosActivos() {
      this.wsService.emit( 'obtener-usuarios');
    }
    loginChatS(nombre: string, sala: string) {
      this.wsService.entrarChat(nombre, sala);
    }
    logoutChatS() {
      this.wsService.logoutWS();
    }

}
