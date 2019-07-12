import { Component, OnInit, OnDestroy } from '@angular/core';
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

  usuariosSubscription: Subscription;
  elemento: HTMLElement;

  usuarios: Usuario[] = [];
  usuario: Usuario ;
  nombre: string;
  sala: string = 'default';

  cargando: boolean = true;
  totalRegistros: number = 0;


  constructor(
    public _chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.nombre = this._usuarioService.usuario.nombre;
    this.sala = this._usuarioService.usuario.sala;
    // this._chatService.loginChatS(this.nombre, this.sala);
     this.usuarios.push(this._usuarioService.usuario);
    // this.usuarios.push(this._usuarioService.usuario);
    // this.usuarios.push(this._usuarioService.usuario);
    // this.chatService.loginChatS(this.email, this.nombre, this.sala);
    // this.usuarios = this.usuarios;
    // this.cargarUsuarios();
    this.elemento = document.getElementById('chat-usuarios');
     this.usuariosSubscription = this._chatService.getUsuariosActivos()
     .subscribe( (resp: any) => {
       this.usuarios = resp.usuarios;
       console.log('cargarusuarios', resp.usuarios);
     });
    // this.usuarios = usuarios1;
    //   console.log('mensaje', this.usuarios);
    // }

     this._modalUploadService.notificacion
          .subscribe( () => this._chatService.getUsuariosActivos() );
  }

  ngOnDestroy() {
    this.usuariosSubscription.unsubscribe();
   }
      //  this.usuariosSubscription = this._chatService.getUsuariosActivos()
      //  .subscribe( (usuarios: Usuario) => {

      //    usuarios.push( usuario );
      //   console.log('usuarios', this.usuarios);
      //  });


        // this._usuarioService.cargarUsuariosTodos()
        //       .subscribe(usuarios1 => {
        //       let usuarios: any = usuarios1;
        //       console.log('mens.comp', usuarios);
        //       return usuarios;
        //     });
      //  for ( let value of this.usuarios ) {
      //   this.usuarios.push(value);
      //   console.log('usuario agregado');
      //  }

      // console.log('usuarios', this.usuarios);

        // this.usuarios.push();
        // this.cargarUsuariosTodos();
        // this.usuarios = if( this.usuario.sala === sala) ;
        // this._modalUploadService.notificacion
        //      .subscribe( () => this.cargarUsuariosTodos());



      // cargarUsuariosTodos() {
      //    this.chatService.getUsuariosActivos()
      //    .subscribe( (resp: any) => {
      //      this.usuarios = resp;
      //      console.log('usuarios', this.usuarios);
      //    });

      // }
    //   levantarUsuarios() {
    //     this._usuarioService.cargarUsuariosTodos()
    //           .subscribe(usuarios => {
    //           console.log('mens.comp', usuarios);
    //           return this.usuarios;
    // });
    // }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
   salir() {
   this._chatService.logoutChatS();
   }

}
