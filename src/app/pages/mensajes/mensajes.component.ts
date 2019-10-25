import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/service.index';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { WebsocketService } from '../../services/service.index';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})

export class MensajesComponent implements OnInit, OnDestroy {

  textoUser = '';
  usuariosSubscription: Subscription;
  salasSubscription: Subscription;
  elemento: HTMLElement;
  usuarios: any[] = [];
  usuario: Usuario ;
  usuariosala: Usuario ;
  nombre: string;
  sala: string;
  salas: any;
  img: string;
  cargando: boolean = true;
  totalRegistros: number = 0;


  constructor(
    public _chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _wsService: WebsocketService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
    let id = params['id'];
    });
   }

  ngOnInit() {
    // this._chatService.getSalasActivas(); /*/*/*/AGREGAR Y PROBAR
    // this._chatService.getSalasActivas()
    // .subscribe( (respu: any ) => {
    //   this.salas = respu;
    //   console.log('salasNGONINIT', this.salas);
    // } );
    this.nombre = this._usuarioService.usuario.nombre;
    this.sala = this._usuarioService.usuario.sala;
    this.img = this._usuarioService.usuario.img;
    this.usuariosala = this._usuarioService.usuario;
    console.log('mens.comp.', this.nombre, this.sala, this.img );

    this._wsService.entrarChat(this.nombre, this.sala, this.img);

    this.elemento = document.getElementById('divUsuarios');

    this._chatService.emitirUsuariosActivos(this.sala);
    this.usuariosSubscription = this._chatService.getUsuariosActivos()
          .subscribe( (respu: Usuario[]= []) => {
            this.usuarios = respu;
            console.log('usuarios en mens.comp', this.usuarios);
          } );

    // this._chatService.emitirSalasActivas();  /*/*/* AGREGAR Y PROBAR
    // this._chatService.getSalasActivas()
    //       .subscribe((respu: []) => {
    //       this.salas = respu;
    //       });
    // let cliente = this._chatService.getCliente();
// console.log('cliente..', cliente );

  }

  ngOnDestroy() {
   this.usuariosSubscription.unsubscribe();
   // this.salasSubscription.unsubscribe();
   }


      // this._usuarioService.actualizarSala(this.usuariosala);
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios1', id );
  }
  buscar() {

    if ( this.textoUser.trim().length === 0 ) {
      return;
    }

     this._chatService.focusBuscar( this.textoUser );
     this.textoUser = '';

  }

  seleccionSala(f: NgForm) {
    console.log( 'fvalue', f.value );

    if ( !f.value ) {
      return;
    }
    console.log('this.usuariosala', this.usuariosala);
    this._usuarioService.seleccionSala( this.usuariosala, f.value)
          .subscribe( (sala: any) => {
            this.sala = sala;
            console.log('sañla:', this.sala);
          });

}
  cambioSala( sala: string ) {
    console.log('Usuarios de sala:', sala );
    this._chatService.emitirUsuariosActivos(sala);
    this.usuariosSubscription = this._chatService.getUsuariosActivos()
          .subscribe( (respu: Usuario[]= []) => {
            this.usuarios = respu;
            console.log('usuarios', this.usuarios);
          } );

  }


// obtenerUsuario( id: string ) {
//   this._usuarioService.obtenerUsuario( id )
//         .subscribe( (usuario: Usuario) => {
//           console.log('obtUsu:', usuario);
//        //   this.usuario = usuario;
//        //  this.usuario.sala = usuario.sala;
//           // this.cambioSala( this.usuario.sala);
//         });
//   }
   salir() {
   this._chatService.logoutChatS();
   }

}


// ** TO DO THING...
// HACER UNA LISTA CON SALAS POSIBLES
// ENCAPSULAR VALUE1/2/3 EN ESA LISTA
// EXPORTAR LOS VALORES AL HTML

// CREAR LAS POSIBILIDAD DE CREAR UNA SALA NUEVA
// QUE DE HECHO SE HACE CUANDO SE SELECCIONA A UN CLIENTE EN PARTICULAR...
// CREA UNA SALA "PRIVADA", PERO TAMBIEN QUIERO CREAR SALAS "PUBLICAS".. Y NO HAY HTML PARA ESO TODAVIA!
