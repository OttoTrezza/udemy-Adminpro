import { Component } from '@angular/core';

import { SettingsService } from './services/service.index';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public _ajustes: SettingsService ) {} // dentro del parentesis: ,private socket: Socket

}
