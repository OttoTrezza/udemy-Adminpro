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



********************


#include <ESP8266WiFi.h>
#include <SocketIOClient.h>
#include <ArduinoJson.h>

#define LED_RED     16 // led rojo5
#define LED_GREEN   14 // led blanco13
#define LED_BLUE    13 // led verde4
//#define ledinpu     14 // 14

// boolean sensorVal = digitalRead(ledinpu);

SocketIOClient client;
const char* ssid     = "WOLVERINE2.4"; //Wifi SSID.
const char* password = "wolverine24"; //Wifi Pass

char host[] = "192.168.0.38"; //nodejs host
int port = 3000; //nodejs port 3000

/*extern String RID;
  extern String Rname;
  extern String Rcontent;*/
StaticJsonDocument<1600> doc;
// StaticJsonDocument<600> doc1;
String JSON;
// String JSON1;
unsigned long previousMillis = 0;
long interval = 25000;
unsigned long lastreply = 0;
unsigned long lastsend = 0;

void setup() {

  doc["nombre"] = "ignacio";
  doc["sala"] = "Juegos";
  doc["cuerpo"] = "hola";
  doc["de"] = "ignacio";

  serializeJson(doc, JSON);

  // doc1["mensaje"]="hola";
  // doc1["nombre"] = "ignacio";

  // serializeJson(doc1, JSON1);

  Serial.begin(115200);
  delay(10);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    return;
  }
  if (client.connected()) {
    client.sendJSON("entrarChat", JSON);
  }


  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  // pinMode(ledinpu, INPUT_PULLUP);

  /*digitalWrite(LED_RED, 1);
  digitalWrite(LED_GREEN, 1);
  digitalWrite(LED_BLUE, 1);
  digitalWrite(LED_RED, 0);
  digitalWrite(LED_GREEN, 0);
  digitalWrite(LED_BLUE, 0);
  */
}

void loop() {

  
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis > interval)
    {
     previousMillis = currentMillis;
     //client.heartbeat(0);
     String salida = "mensaje numero: ";
     salida.concat(String(currentMillis));

    /* doc["mensaje"] = "hola";
       doc["nombre"] = "ignacio";
       serializeJson(doc, JSON);
  */
   client.sendJSON("mensaje",JSON);
    lastsend = 0;
  }
  String json = client.on();

  if (json.length() > 0) {
    Serial.print("json: ");
    Serial.print(json);
    Serial.println(); Serial.println(); Serial.println();

    const size_t capacity = JSON_ARRAY_SIZE(2) + JSON_OBJECT_SIZE(3) + 150;
    DynamicJsonDocument doc2(capacity);
    deserializeJson(doc2, json);

    //const char* event = doc2[0]; // "mensaje"
    String event = doc2[0]; // "mensaje"

    Serial.print("event: ");
    Serial.println(event);

    /* if (event == "mensaje") {

         String de = doc2[1]["de"]; // "s"
         String cuerpo = doc2[1]["cuerpo"]; // ""

         Serial.print(" user ");
         Serial.print(de);
         Serial.print(" says: ");
         Serial.println(cuerpo);
       } */

    if (event == "mensaje-nuevo") {

      String de = doc2[1]["de"]; // "s"
      String cuerpo = doc2[1]["cuerpo"]; // ""
      if ( cuerpo[0] == '#') {
        // we get RGB data

        // decode rgb data
        uint32_t rgb = (uint32_t) strtol((const char *) &cuerpo[1], NULL, 16);

        analogWrite(LED_RED,    ((rgb >> 16) & 0xFF));
       // analogWrite(LED_GREEN,  ((rgb >> 8) & 0xFF));
        analogWrite(LED_BLUE,   ((rgb >> 0) & 0xFF));
      }
      Serial.print(" user ");
      Serial.print(de);
      Serial.print(" says: ");
      Serial.println(cuerpo);
    }
    /*
      if (event == "usuarios-activos") {

          char usuarios = doc2[1]["usuarios"]; // "usuarios"


          Serial.print(" usuarios: ");
          Serial.print(usuarios);
        }

      if (event == "salas") {

          char salas = doc2[1]["salas"]; // "salas"

          Serial.print(" salas: ");
          Serial.print(salas);
        }
    */
   /* if (event == "chat:typing") {
      boolean typing = doc2[1]["typing"]; // true || false
      if (typing) {
        String nombre = doc2[1]["nombre"];
        Serial.print(" user ");
        Serial.print(nombre);
        Serial.print(" is typing...");
      } else {
        typing = false;
      }
    }*/

    if (event == "disconnect") {

      String nombre = doc2[1]["nombre"];
      Serial.print(" user: ");
      Serial.print(nombre);
      Serial.print(" has left the room");
    }
  }
}
