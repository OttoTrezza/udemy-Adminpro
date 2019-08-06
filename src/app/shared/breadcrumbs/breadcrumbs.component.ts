import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { UsuarioService } from '../../services/service.index';
// import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
nombre: string;
titulo: string;

  constructor( private router: Router,
              private title: Title,
              private meta: Meta,
              public _usuarioService: UsuarioService) {

    this.getDataRoute()
    .subscribe( data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'descripcion',
        content: this.titulo
      };
      this.meta.updateTag( metaTag );
      });
  }

  ngOnInit() {
    this.nombre = this._usuarioService.usuario.nombre;
  }
getDataRoute() {
  return this.router.events.pipe(
    filter( evento => evento instanceof ActivationEnd ),
    filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
    map( (evento: ActivationEnd) => evento.snapshot.data)
  );
}
}
