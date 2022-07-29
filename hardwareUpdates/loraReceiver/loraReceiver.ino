#include <SPI.h>              // include libraries
#include <LoRa.h>
  
//byte MasterNode = 0xFF;     
//byte Node1 = 0xBB;
 
String SenderNode = "";
String outgoing;              // outgoing message
 
byte msgCount = 0;            // count of outgoing messages
String incoming = "";
 
int Sensor1 = 0; // rainSensor
int Sensor2 = 0; // gasSensor

 
//String DayNight = "";
 
void setup() {
  Serial.begin(9600);
 
  while (!Serial);
   LoRa.begin(433.0);
    
  Serial.println("LoRa Receiver");
  if (!LoRa.begin(433.0)) { // or 915E6
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}
 
 
void loop() {
 
  // parse for a packet, and call onReceive with the result:
  onReceive(LoRa.parsePacket());
    
  }
 
 
void onReceive(int packetSize) {
//  if (packetSize == 0) return;          // if there's no packet, return
// 
//  // read packet header bytes:
//  int recipient = LoRa.read();          // recipient address
//  byte sender = LoRa.read();            // sender address
//  if( sender == 0XBB )
//  SenderNode = "Node1:";
//  byte incomingMsgId = LoRa.read();     // incoming msg ID
//  byte incomingLength = LoRa.read();    // incoming msg length
 
 
  while (LoRa.available()) {
    incoming += (char)LoRa.read();
  }
 
//  if (incomingLength != incoming.length()) {   // check length for error
//    //Serial.println("error: message length does not match length");
//    ;
//    return;                             // skip rest of function
//  }
// 
//  // if the recipient isn't this device or broadcast,
//  if (recipient != Node1 && recipient != MasterNode) {
//   // Serial.println("This message is not for me.");
//    ;
//    return;                             // skip rest of function
//  }
 
  // if message is for this device, or broadcast, print details:
//Serial.println("Received from: 0x" + String(sender, HEX));
//Serial.println("Sent to: 0x" + String(recipient, HEX));
//Serial.println("Message ID: " + String(incomingMsgId));
//Serial.println("Message length: " + String(incomingLength));
//Serial.println("Message: " + incoming);
//Serial.println("RSSI: " + String(LoRa.packetRssi()));
//Serial.println("Snr: " + String(LoRa.packetSnr()));
//Serial.println();

String q = getValue(incoming, ',', 0); // rainSensor
String r = getValue(incoming, ',', 1); // gasSensor

Sensor1 = q.toInt(); 
Sensor2 = r.toInt();

//Serial.print("Rain value : " );
Serial.print(Sensor1);
Serial.print(",");
Serial.println(Sensor2);


//Serial.print("Gas value : " );
//Serial.println(Sensor2);


}
 
String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;
 
    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
