import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PromesasComponent } from './rxjs/promesas/promesas.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


// AGREGADO INICIO **

// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
// AGREGADO FIN *
const config: SocketIoConfig = {
  url: environment.wsUrl , options: {}
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PromesasComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
