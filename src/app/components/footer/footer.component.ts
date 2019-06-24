import { Component } from '@angular/core';
import { WebsocketService } from '../../services/service.index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {

  constructor(
    public wsService: WebsocketService
  ) { }
}
