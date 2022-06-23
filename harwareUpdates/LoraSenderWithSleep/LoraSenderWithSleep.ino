#include <SPI.h>              // include libraries
#include <LoRa.h>
#include <LowPower.h>
 
int rainSensor = A2; // rainSensor
int moistureSensor = A3; // moistureSensor

const unsigned long SECOND = 1000;
const unsigned long HOUR = 3600*SECOND;
int sleepCount;           //for sleep mode

 
String outgoing;              // outgoing message
 
byte msgCount = 0;            // count of outgoing messages
//byte MasterNode = 0xFF;     
//byte Node1 = 0xBB;
 
int Sensor1 = 0; // rainSensor
int Sensor2 = 0; // moistureSensor

   
String Mymessage = "";
void setup() {
  Serial.begin(9600);
  pinMode(rainSensor, INPUT);
  pinMode(moistureSensor, INPUT);
  
   while (!Serial); 
  LoRa.begin(433.0);

  Serial.println("LoRa Sender");
  
  if (!LoRa.begin(433.0)) { // or 915E6, the MHz speed of your module
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
    
    Mymessage = Mymessage + Sensor1 +"," + Sensor2 ;
    //Serial.println(Mymessage);
    
    sendMessage(Mymessage);
    
    delay(2000);
    Mymessage = "";


    delay(10*1000); //delay of 10 seconds for which the data is continuously transmitted through LoRa (yet to be tested)

    for(sleepCount = 0; sleepCount<5400; sleepCount++) //5400 for 12 hrs triggering
    {
      LowPower.powerDown(SLEEP_8S, ADC_OFF, BOD_OFF);  
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
