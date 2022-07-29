#include <SPI.h>
#include <LoRa.h> 
#include <Servo.h>


//int pot = A0;
 
int rainSensor = A2;
int moistureSensor = A3;

int Sensor1 = 0;
int Sensor2 = 0;

Servo myservo;
int pos = 0; 

String outgoing; 
String Mymessage = "";  

void setup() {
  Serial.begin(9600);
  pinMode(rainSensor,INPUT);
  pinMode(moistureSensor,INPUT);

  myservo.attach(9); 
  
  while (!Serial);  
  Serial.println("LoRa Sender");
  if (!LoRa.begin(433.0)) { // or 915E6, the MHz speed of yout module
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}
 
void loop() {
 
 
    Sensor1 = analogRead(rainSensor);
    delay(10);
    Sensor2 = analogRead(moistureSensor); 
    delay(10);

    Sensor1 = map(Sensor1, 50, 1000, 325, 15);

    if (Sensor2 < 10)
    
    {

    for (pos = 0; pos <= 180; pos += 1) { /* goes from 0 degrees to 180 degrees in steps of 1 degree */
    myservo.write(pos);              /* tell servo to go to position in variable 'pos' */
    delay(5);                       /* waits 15ms for the servo to reach the position */
  }
  for (pos = 180; pos >= 0; pos -= 1) { /* goes from 180 degrees to 0 degrees */
    myservo.write(pos);              /* tell servo to go to position in variable 'pos' */
    delay(5);                       /* waits 15ms for the servo to reach the position */
  }
    Mymessage = Mymessage + Sensor1 +"," + Sensor2 ;
    //Serial.println(Mymessage);
    
    sendMessage(Mymessage);
    
    delay(2000);
    Mymessage = "";

    }

    else
    {
      Mymessage = Mymessage + Sensor1 +"," + Sensor2 ;
    //Serial.println(Mymessage);
    
    sendMessage(Mymessage);
    
    delay(2000);
    Mymessage = "";
    }
  
 
}
 
void sendMessage(String outgoing) {
  LoRa.beginPacket();                   // start packet
  //LoRa.write(MasterNode);              // add destination address
  //LoRa.write(Node1);             // add sender address
  //LoRa.write(msgCount);                 // add message ID
  //LoRa.write(outgoing.length());        // add payload length
  LoRa.print(outgoing); 
  Serial.println(outgoing);    // add payload
  LoRa.endPacket();                     // finish packet and send it
  //msgCount++;                           // increment message ID
}
