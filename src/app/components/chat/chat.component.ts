import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, ModalUploadService} from '../../services/service.index';
import { Subscription } from 'rxjs/Subscription';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
// import * as $ from 'jquery';
// var params = new URLSearchParams(window.location.search);

// var nombre = params.get('nombre');
// var sala = params.get('sala');
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  textoUser = '';
  texto = '';
  mensajesSubscription: Subscription;
  elemento: HTMLElement;
  usuario: Usuario;
  mensajes: any[] = [];
  msg: any;
  fecha: Date;
  hora: any;

  constructor(
    public _chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }


  ngOnInit() {

    this.elemento = document.getElementById('divChatbox');

    this.mensajesSubscription = this._chatService.getMessages()
     .subscribe( (msg: any) => {
       console.log('En Subscribe', msg);
       let de: string = msg.de;
       let cuerpo: string = msg.cuerpo;
       // let fecha = new Date(msg.fecha);
       let img: string = '';
       if ( msg.img ) { img = msg.img;
       }
       if ( msg.de === this._usuarioService.usuario.nombre) {
        de = 'yo';
       }
      //  if ( msg.de === 'Administrador') {
      //   this.adminClass = 'box bg-light-danger';
      //  }

      //  let hora = fecha.getHours() + ':' + fecha.getMinutes();
        this.msg = {
          de,
          cuerpo,
      //    hora,
          img
        };

    this.mensajes.push( this.msg );
    console.log('mensaje1', this.msg);
    // this.scrollBottom();
    // setTimeout(() => {
    //   this.elemento.scrollTop = this.elemento.scrollHeight;
    //   }, 50);
     });

     this._modalUploadService.notificacion
          .subscribe( resp => this._usuarioService.cargarUsuarios() );
         // this.scrollBottom();


}
  ngOnDestroy() {
   this.mensajesSubscription.unsubscribe();
  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
    // this.scrollBottom();
  }
//  scrollBottom() {

//     // selectors
//      let newMessage = this.divChatbox.children('li:last-child');
//      // let heights;
//      let clientHeight = this.divChatbox.prop('clientHeight');
//      let scrollTop = this.divChatbox.prop('scrollTop');
//      let scrollHeight = this.divChatbox.prop('scrollHeight');
//      let newMessageHeight = newMessage.innerHeight();
//      let lastMessageHeight = newMessage.prev().innerHeight() || 0;

//     if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//         this.divChatbox.scrollTop(scrollHeight);
//     }
// }
  enviar() {

    if ( this.texto.trim().length === 0 ) {
   //   this.scrollBottom();
      return;
    }

     this._chatService.sendMessage( this.texto, this.usuario.sala, (resp: any) => {
       this.msg = resp;
       console.log('this.msg = ', this.msg);
   //    this.scrollBottom();
      });
     this.texto = '';

  }

}
// socket.emit('crearMensaje', {
  //       nombre: nombre,
  //       mensaje: txtMensaje.val()
  //   }, function(mensaje) {
  //       txtMensaje.val('').focus();
  //       renderizarMensajes(mensaje, true);
  //       scrollBottom();
  //   });
