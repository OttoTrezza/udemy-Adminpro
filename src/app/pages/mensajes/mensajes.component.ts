import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/service.index';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
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
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion

// ///////
//     .subscribe( resp => this.cargarUsuarios() );
// daba resp estaba pintado como que no se usaba, en ocuro)
// ///////
          .subscribe( () => this.cargarUsuarios() );

    this.nombre = this._usuarioService.usuario.nombre;
    this.sala = 'Juegos';
  }
  cargarUsuarios() {
    this._usuarioService.cargarUsuarios()
          .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
    });
  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
   salir() {
  //   this.wsService.logoutWS();
   }

}
