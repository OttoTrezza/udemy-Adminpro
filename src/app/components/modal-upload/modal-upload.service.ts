import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();
  constructor() {
   }
   ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
   }
   mostrarModal( tipo: string, id: any) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
    console.log( this.id, this.tipo);
   }
}
