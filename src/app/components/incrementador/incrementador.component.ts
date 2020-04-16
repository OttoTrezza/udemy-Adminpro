import { Component, Input, Output, ViewChild, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { ChatService } from '../../services/chatservice/chat.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  [x: string]: any;


  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Input() progreso1: number;
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();
  // @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();
  constructor(
    public WsService: WebsocketService,
    public ChatS: ChatService,
    public _usuarioService: UsuarioService
  ) {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  onChanges( newValue: number ) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];

    if ( newValue >= 256 ) {
      this.progreso = 256;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
    this.hexString = '#' +  this.progreso.toString(16) + this.progreso.toString(16) + this.progreso.toString(16) ;
    this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
     console.log('this.msg = ', this.hexString, resp);

   });
//  this.hexString = '#' +  this.progreso.toString(16) + '00ff';
//  this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
//   this.msg = resp;
//   console.log('this.msg = ', this.msg);
// //    this.scrollBottom();
//  });

  }

  cambiarValor( valor: number ) {

    if ( this.progreso >= 256 && valor > 0 ) {
      this.progreso = 256;
      return;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );
    this.hexString = '#' +  this.progreso.toString(16) + this.progreso.toString(16) + this.progreso.toString(16) ;
    this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
     console.log('this.msg = ', this.hexString, resp);

  //   this.hexString = '#' +  this.progreso.toString(16) + this.progreso.toString(16) + this.progreso.toString(16) ;
  //   this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
  //    console.log('this.msg = ', this.hexString, resp);
  //  //    this.scrollBottom();
  //   });
    this.txtProgress.nativeElement.focus();
//     this.hexString = '#' +  this.progreso.toString(16) + '00ff';
//  this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
//   this.msg = resp;
//   console.log('this.msg1 = ', this.msg);
// //    this.scrollBottom();
//  });
//   cambiarValor1( valor: number ) {

//     if ( this.progreso1 >= 256 && valor > 0 ) {
//       this.progreso1 = 256;
//       return;
//     }

//     if ( this.progreso1 <= 0 && valor < 0 ) {
//       this.progreso1 = 0;
//       return;
//     }

//     this.progreso1 = this.progreso1 + valor;

//     this.cambioValor.emit( this.progreso1 );
//     this.hexString1 = '#' +  this.progreso1.toString(16) + this.progreso.toString(16) + this.progreso.toString(16) ;
//     this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
//      console.log('this.msg = ', this.hexString, resp);
//    //    this.scrollBottom();
//     });
//     this.txtProgress.nativeElement.focus();
// //     this.hexString = '#' +  this.progreso.toString(16) + '00ff';
// //  this.ChatS.sendMessage( this.hexString, this._usuarioService.usuario.sala, (resp: any) => {
// //   this.msg = resp;
// //   console.log('this.msg1 = ', this.msg);
// // //    this.scrollBottom();
// //  });

//   }

    });
}
}
