import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/service.index';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
// import { WebsocketService } from '../../services/service.index';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
usuarios: Usuario[] = [];
nombre: string;
sala: string;
cargando: boolean = true;
totalRegistros: number = 0;
  constructor(
    public chatService: ChatService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    // public _wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion

// /////////  conectar cliente!!!!!!!!!!

//     .subscribe( resp => this.cargarUsuarios() );
// daba resp estaba pintado como que no se usaba, en ocuro)
// ///////
          .subscribe( resp => this.cargarUsuarios());

  }
  cargarUsuarios() {
     this.chatService.getUsuariosActivos();

  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
   salir() {
   this.chatService.logoutChatS();
   }

}
