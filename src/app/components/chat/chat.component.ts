import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService} from '../../services/service.index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];
  msg: any;


  constructor(
    public _chatService: ChatService
  ) { }


  ngOnInit() {
    // this.mensajes = [{cuerpo: 'Bienvenido', de: 'Administrador'}, {cuerpo: 'Hola', de: 'Administrador'}];
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this._chatService.getMessages()
     .subscribe( (msg: any) => {
      let de: string = msg.de;
      let cuerpo: string = msg.cuerpo;
      this.msg = {
        cuerpo,
        de
      };

    this.mensajes.push( this.msg );
    console.log('mensaje', this.msg);
    setTimeout(() => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });

  }
  ngOnDestroy() {
   this.mensajesSubscription.unsubscribe();
  }


  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }

     this._chatService.sendMessage( this.texto );
     this.texto = '';

  }

}
