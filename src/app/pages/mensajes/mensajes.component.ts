import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { ChatService } from '../../services/service.index';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { WebsocketService } from '../../services/service.index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})

export class MensajesComponent implements OnInit, OnDestroy {
 // @ViewChild('salaSelected', {static: false}) salaSelected: ElementRef;

 @Input('value1') value1: string = 'cargando sala';
 @Input('value2') value2: string = 'cargando sala';
 @Input('value3') value3: string = 'cargando sala';
  divUsuarios = $('#divUsuarios');
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
    public _wsService: WebsocketService
  ) { }

  ngOnInit() {
    let salas = this._usuarioService.obtenerSalas('salas');
    this.salas = salas;
    console.log('this.salas', this.salas);
    this.value1 = this.salas[0];
    this.value2 = this.salas[1];
    this.value3 = this.salas[2];
    console.log('salas', this.salas);
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
// ** TO DO THING...
// HACER UNA LISTA CON SALAS POSIBLES
// ENCAPSULAR VALUE1/2/3 EN ESA LISTA
// EXPORTAR LOS VALORES AL HTML

// CREAR LAS POSIBILIDAD DE CREAR UNA SALA NUEVA
// QUE DE HECHO SE HACE CUANDO SE SELECCIONA A UN CLIENTE EN PARTICULAR...
// CREA UNA SALA "PRIVADA", PERO TAMBIEN QUIERO CREAR SALAS "PUBLICAS".. Y NO HAY HTML PARA ESO TODAVIA!


    // if (this.sala === this.value1) {

    //   this.usuariosala = this._usuarioService.usuario;
    //   this.usuariosala.sala = this.value1;
    //   this._usuarioService.actualizarSala(this.usuariosala);
    // } else {
    //   this.sala1 = false;
    // }

    // if (this.sala === this.value2) {

    //   this.usuariosala = this._usuarioService.usuario;
    //   this.usuariosala.sala = this.value2;
    // } else {
    //   this.sala2 = false;
    // }

    // if (this.sala === this.value3) {

    //   this.usuariosala = this._usuarioService.usuario;
    //   this.usuariosala.sala = this.value3;
    // } else {
    //   this.sala3 = false;
    // }
    // this.usuarios.push(this._usuarioService.usuario);

   // this.elemento = document.getElementById('chat-usuarios');
    // this.usuariosSubscription = this._chatService.getUsuariosActivos()
    //  .subscribe( (usuarios1: Usuario[]) => {
    //    this.usuarios = usuarios1;
    //    console.log('cargarusuarios', usuarios1);
    //  });

    //  this._modalUploadService.notificacion
    //       .subscribe( () => this._chatService.getUsuariosActivos() );
  }

  ngOnDestroy() {
  //  this.usuariosSubscription.unsubscribe();
   }

  onChanges( newValue: string ) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];

    // console.log( this.txtProgress );

    if ( newValue === this.value1 ) {
      this.sala = newValue;
      this.usuariosala.sala = this.value1;
      this._usuarioService.actualizarSala(this.usuariosala);

    } else if ( newValue === this.value2 ) {
      this.sala = newValue;
      this.usuariosala.sala = this.value2;

    } else if (newValue === this.value3 ) {
      this.sala = newValue;
      this.usuariosala.sala = this.value3;
    }
    this._usuarioService.actualizarSala(this.usuariosala);

    // elemHTML.value = this.progreso;
   // this.salaSelected.nativeElement.value = this.sala;
  }
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

   salir() {
   this._chatService.logoutChatS();
   }

}


