import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/service.index';
import { ChatService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(
    public wsService: WebsocketService,
    public chatServie: ChatService
  ) { }

  ngOnInit() {
    init_plugins();
    this.chatServie.getMessagesPrivate().subscribe( msg => {

      console.log(msg);
    });
  }

}
