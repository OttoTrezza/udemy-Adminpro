import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedico()
          .subscribe( medicos => {
            this.medicos = medicos;
            this.cargando = false;
          });
  }

  buscarMedico( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;

    this._medicoService.buscarMedicos( termino )
              .subscribe((hospitales: Medico[]) => {
                this._medicoService.totalMedicos = null;
                this.medicos = hospitales;
                this.cargando = false;
              });
  }


  borrarMedico( medico: Medico ) {
 this._medicoService.borrarMedico( medico._id )
       .subscribe( () => this.cargarMedicos() );
  }


  cambiarDesde(valor: number ) {

    let desdem = JSON.parse( localStorage.getItem('desdem')) + valor;

    if ( desdem >= this._medicoService.totalMedicos) {
      return;
    }
    if (desdem < 0) {
      return;
    }

    this._medicoService.guardardesdeStorage( desdem );
    this.cargarMedicos();
  }

}
