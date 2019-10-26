START / END POINTS TRACK


angular.json line 28:   Configuration production or dev use file.
src/app/environments: define 2 files from 2 environments. "http://localhost:3000...(env.dev)" and "https://mighty-depths-88183.herokuapp.com/public/...(env.pro)"
src/main: ejecute environment.
index.html: every "href" and "script src" are location files definitions. 

index.html line 43: APPROOT live here!!!! THIS IS MY START POINT APLICATION!

app.routes.ts line 16: redirection to pages.routes.ts, THIS IS MY SECOND START POINT!

pages.routes.ts from here, the app routes to pages and components who call services to comunicate with backend

app/services: this is the folder who contains all my ENDpoint to back-end(ask´s) and STARTpoint from back-end(answer´s).

app.module.ts line 36: STARTpoint socekts


usuario.services no lo cambie
webSocket.services PROBLEMAS EN PAYLO: 
this._chatService.sendMessage( paylo , (resp: any) => {
       this.msg = resp;
       console.log('this.msg = ', this.msg);
   //    this.scrollBottom();
      });
     this.texto = '';

