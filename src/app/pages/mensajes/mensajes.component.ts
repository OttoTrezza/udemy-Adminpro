import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { ChatService } from '../../services/service.index';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { WebsocketService } from '../../services/service.index';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})

export class MensajesComponent implements OnInit, OnDestroy {

  textoUser = '';
  usuariosSubscription: Subscription;
  elemento: HTMLElement;
  usuarios: any[] = [];
  usuario: Usuario ;
  usuariosala: Usuario ;
  nombre: string;
  sala: string = this._usuarioService.usuario.sala;
  salas: any;
  cargando: boolean = true;
  totalRegistros: number = 0;


  constructor(
    public _chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _wsService: WebsocketService,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
    let id = params['id'];
    });
   }

  ngOnInit() {

    // let salasf = this._usuarioService.obtenerSalas('salas');
    // console.log('salasf', salasf);
    // this.salas = salasf;
    // console.log('this.salas', this.salas);

    // console.log('salasf', salasf);
    this.elemento = document.getElementById('divUsuarios');
    this._chatService.emitirUsuariosActivos();
   this.usuariosSubscription = this._chatService.getUsuariosActivos()
          .subscribe( (respu: Usuario[]= []) => {
            this.usuarios = respu;
            console.log('usuarios', this.usuarios);
          } );

    this.nombre = this._usuarioService.usuario.nombre;
    this.sala = this._usuarioService.usuario.sala;
    this.usuariosala = this._usuarioService.usuario;

  }

  ngOnDestroy() {
  //  this.usuariosSubscription.unsubscribe();
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
      console.log( f.value );

      if ( !f.value ) {
        return;
      }
      this._usuarioService.seleccionSala(this.usuario, this.sala)
            .subscribe( (sala: any) => {
              this.sala = sala;
            });




  console.log('sala',  this.sala );
  }
  cambioSala( id: string ) {
    this._usuarioService.obtenerUsuario( id )
    .subscribe( (usuario: any) => this.usuario.sala = usuario.sala );
  }

obtenerUsuario( id: string ) {
  this._usuarioService.obtenerUsuario( id )
        .subscribe( usuario => {
          console.log(usuario);
          this.usuario = usuario;
          this.usuario.sala = usuario._id;
          this.cambioSala( this.usuario.sala);
        });
  }
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
