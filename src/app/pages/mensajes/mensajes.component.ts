import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, ElementRef } from '@angular/core';
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

  divUsuarios = $('#divUsuarios');
  textoUser = '';
  usuariosSubscription: Subscription;
  elemento: HTMLElement;
  usuarios: any[] = [];
  usuario: Usuario ;
  usuariosala: Usuario ;
  nombre: string;
  sala: string = this._usuarioService.usuario.sala;
  value1: string;
  value2: string;
  value3: string;
  sala1: boolean;
  sala2: boolean;
  sala3: boolean;

  cargando: boolean = true;
  totalRegistros: number = 0;


  constructor(
    public _chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _wsService: WebsocketService
  ) { }

  ngOnInit() {
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


    if (this.sala === this.value1) {
      this.sala1 = true;
      this.usuariosala = this._usuarioService.usuario;
      this.usuariosala.sala = this.value1;
      this._usuarioService.actualizarSala(this.usuariosala);
    } else {
      this.sala1 = false;
    }

    if (this.sala === this.value2) {
      this.sala2 = true;
      this.usuariosala = this._usuarioService.usuario;
      this.usuariosala.sala = this.value2;
    } else {
      this.sala2 = false;
    }

    if (this.sala === this.value3) {
      this.sala3 = true;
      this.usuariosala = this._usuarioService.usuario;
      this.usuariosala.sala = this.value3;
    } else {
      this.sala3 = false;
    }
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
      this.sala2 = this.sala3 = false;
      this.sala1 = true;
      this.usuariosala.sala = this.value1;
      this._usuarioService.actualizarSala(this.usuariosala);
    } else if ( newValue === this.value2 ) {
      this.sala = newValue;
      this.sala1 = this.sala3 = false;
      this.sala2 = true;
      this.usuariosala.sala = this.value2;
      this._usuarioService.actualizarSala(this.usuariosala);
    } else if (newValue === this.value3 ) {
      this.sala = newValue;
      this.sala1 = this.sala2 = false;
      this.sala3 = true;
      this.usuariosala.sala = this.value3;
      this._usuarioService.actualizarSala(this.usuariosala);
    }

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


// // ////
// function renderizarUsuarios(personas) {
//   console.log(personas);

//   var html = '';
//   html += '<li>';
//   html += '   <a href = "javascript:void(0)" class = "active" > Chat de <span>' + params.get('sala') + '</span></a> ';
//   html += '</li>';
//   for (var i = 0; i < personas.length; i++) {
//       html += '<li>';
//       html += '<a data-id="' + personas[i].id +
// '"href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '
// <small class="text-success">online</small></span></a>';
//       html += '</li>';
//   }
//   divUsuarios.html(html);
// }

// function renderizarMensajes(mensaje, yo) {
//   var html = '';
//   var fecha = new Date(mensaje.fecha);
//   var hora = fecha.getHours() + ':' + fecha.getMinutes();

//   var adminClass = 'info';
//   if (mensaje.nombre === 'Administrador') {
//       adminClass = 'danger';
//   }
//   if (yo) {
//       html += '<li class="reverse">';
//       html += '    <div class="chat-content">';
//       html += '        <h5>' + mensaje.nombre + '</h5>';
//       html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
//       html += '    </div>';
//       html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
//       html += '    <div class="chat-time">' + hora + '</div>';
//       html += '</li>';

//   } else {
//       html += '<li class="animated fadeIn">';
//       if (mensaje.nombre !== 'Administrador') {
//           html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
//       }
//       html += '   <div class="chat-content">';
//       html += '       <h5>' + mensaje.nombre + '</h5>';
//       html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
//       html += '   </div>';
//       html += '   <div class="chat-time">' + hora + '</div>';
//       html += '</li>';
//   }
//   divChatbox.append(html);

// }

// function scrollBottom() {

//   // selectors
//   var newMessage = divChatbox.children('li:last-child');

//   // heights
//   var clientHeight = divChatbox.prop('clientHeight');
//   var scrollTop = divChatbox.prop('scrollTop');
//   var scrollHeight = divChatbox.prop('scrollHeight');
//   var newMessageHeight = newMessage.innerHeight();
//   var lastMessageHeight = newMessage.prev().innerHeight() || 0;

//   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//       divChatbox.scrollTop(scrollHeight);
//   }
// }

// // Listeners
// divUsuarios.on('click', 'a', function() {
//   var id = $(this).data('id');
//   if (id) {
//       console.log(id);
//   }

// });

// formEnviar.on('submit', function(e) {

//   e.preventDefault();
//   if (txtMensaje.val().trim().length === 0) {
//       return;
//   }
//   socket.emit('crearMensaje', {
//       nombre: nombre,
//       mensaje: txtMensaje.val()
//   }, function(mensaje) {
//       txtMensaje.val('').focus();
//       renderizarMensajes(mensaje, true);
//       scrollBottom();
//   });

// });
