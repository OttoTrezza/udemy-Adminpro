import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
    .subscribe (
      numero => console.log('subs', numero ),
      error => console.error('error en el obs', error),
      () => console.log('El Observador termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La Pagina se va a cerrar');
    this.subscription.unsubscribe();
  }
  regresaObservable(): Observable<any> {
    return new Observable( ( observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval (() => {
        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete ();
        // }
        // if (contador === 2) {
        //   clearInterval( intervalo );
        //   observer.error ('Auxilio!');
        // }
    }, 1000);
  }).pipe(
    map( resp => resp.valor),
    filter(  (valor, index) => {
      // console.log('Filter', valor, index);

      if ( (valor % 2) === 1 ) {
        return true;
      }else {
        return false;
      }
     // return true;
    } )
  );
  }
}
