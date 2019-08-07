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
img: string;
  constructor(
    public wsService: WebsocketService,
     public http: HttpClient,
  ) { }

    sendMessage( mensaje: string, callback: any ) {
      this.name = this.wsService.getUsuario().nombre;
      this.img = this.wsService.getUsuario().img;
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
     // console.log('Recibido,getMes');
     // console.log('mensaje-nuevo recibido');
       return this.wsService.listen( 'mensajeDeServidor' );

      }
      getMessages() {
       //  console.log('Recibido,mens-nuevo');
       // console.log('mensaje-nuevo recibido');
         return this.wsService.listen( 'mensaje-nuevo' );

        }


    getUsuariosActivos() {
      // console.log('Recibido UsuActivos');
      return this.wsService.listen( 'usuarios-activos' );
      }
      getSalasActivas() {
        // console.log('Recibido UsuActivos');
        return this.wsService.listen( 'salas-activas' );
        }
        getFalasActivas() {
          // console.log('Recibido UsuActivos');
          return this.wsService.listen( 'Falas-activas' );
          }

    focusBuscar(nombre: string) {
    // focus en la lista de usuarios del mensajesComponent.html
    }
    emitirUsuariosActivos() {

      this.wsService.emit( 'obtener-usuarios', (entro: boolean) => {
        if (entro === true) {
          console.log('Server:petición recibida');
          } else {
            console.log('Sin respuesta del servidor');
            }
        }
      );
    }
    loginChatS(nombre: string, sala: string, img: string) {
      this.wsService.entrarChat(nombre, sala, img);
    }
    logoutChatS() {
      this.wsService.logoutWS();
    }

}
