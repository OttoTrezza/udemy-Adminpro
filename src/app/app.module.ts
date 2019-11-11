import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
// import { PagesModule } from './pages/pages.module';
// import { PipesModule } from './pipes/pipes.module';

// Servicios
import { ServiceModule } from './services/service.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PromesasComponent } from './rxjs/promesas/promesas.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
// import { BusquedaComponent } from './pages/busqueda/busqueda.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { HospitalesComponent } from './pages/hospitales/hospitales.component';
// import { MedicoComponent } from './pages/medicos/medico.component';
// import { MedicosComponent } from './pages/medicos/medicos.component';
// import { ProfileComponent } from './pages/profile/profile.component'

// AGREGADO INICIO **
 import { environment } from '../environments/environment';
// // sockets
  import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
  const config: SocketIoConfig = {
   url: environment.wsUrl, options: {}
   };
// console.log('URL', this.url);
// export const environment = {
//   production: true,
//   wsUrl: 'http://localhost:3000/'
// };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PromesasComponent,
    PagesComponent,
    FooterComponent
    // BusquedaComponent,
    // DashboardComponent,
    // Graficas1Component,
    // HospitalesComponent,
    // MedicoComponent,
    // MedicosComponent,
   // ProfileComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    SocketIoModule.forRoot(config)
    // PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
