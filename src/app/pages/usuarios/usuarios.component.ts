import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios() );

  }


  cargarUsuarios() {
    this._usuarioService.cargarUsuarios()
          .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
    });
  }


  buscarUsuario( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
              .subscribe((usuarios: Usuario[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
              });
  }


  guardarUsuario( usuario: Usuario) {
      this._usuarioService.actualizarUsuario( usuario)
            .subscribe();
  }


  borrarUsuario( usuario: Usuario) {
    if ( usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then (borrar => {
      console.log( borrar );
      if ( borrar ) {
      this._usuarioService.borrarUsuario( usuario._id)
            .subscribe( borrado => {
              console.log( borrado );
              this.cargarUsuarios();
            });
      }
    });
  }



  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }



  cambiarDesde(valor: number ) {

    let desdeu = JSON.parse( localStorage.getItem('desdeu')) + valor;

    if ( desdeu >= this.totalRegistros) {
      return;
    }
    if (desdeu < 0) {
      return;
    }

    this._usuarioService.guardardesdeStorage( desdeu );
    this.cargarUsuarios();
  }

}
