from pymongo import MongoClient
from datetime import datetime
import pyfirmata 
import time 


board = pyfirmata.Arduino('COM4')
client = MongoClient("mongodb+srv://test_user:test_user@sensordata.4x7l6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

it = pyfirmata.util.Iterator(board)
it.start()

i = 0

soil_hum_avg = 0
soil_ph_avg = 0
air_temp_avg = 0
air_hum_avg = 0
rain_val_avg = 0

while True:
    board.analog[0].enable_reporting()
    board.analog[1].enable_reporting()
    board.analog[2].enable_reporting()
    board.analog[3].enable_reporting()
    board.analog[4].enable_reporting()
    
    soil_hum = board.analog[0].read()
    soil_ph = board.analog[1].read()
    air_temp = board.analog[2].read()
    air_hum = board.analog[3].read()
    rain_val = board.analog[4].read()

    params = [soil_hum, soil_ph, air_temp, air_temp, air_hum, rain_val]
    
    for x in params:
        if (x == None):
            x = 0
            
    soil_hum_avg = soil_hum_avg + soil_hum
    soil_ph_avg = soil_ph_avg + soil_ph
    air_temp_avg = air_temp_avg + air_temp
    air_hum_avg = air_hum_avg + air_hum
    rain_val_avg = rain_val_avg + rain_val

    #print(gas_val)


    i = i + 1
    if(i==10):
        soil_hum_avg= '%.3f'%(soil_hum_avg/10)
        soil_ph_avg= '%.3f'%(soil_ph_avg/10)
        air_temp_avg= '%.3f'%(air_temp_avg/10)
        air_hum_avg= '%.3f'%(air_hum_avg/10)
        rain_val_avg= '%.3f'%(rain_val_avg/10)


        print(f"Average soil humidity value : {soil_hum_avg}")
        print(f"Average soil ph value : {soil_ph_avg}")
        print(f"Average air temperature value : {air_temp_avg}")
        print(f"Average air humidity value : {air_hum_avg}")
        print(f"Average rain fall value : {rain_val_avg}")

        db = client.get_database('smartAgricare') #db Name
        record = db.sensordatas  #document name
        when = datetime.now().strftime("%d-%m-%y %H:%M")
        new_val = {
            'when' : when,
            'soil_hum' : str(soil_hum_avg),
            'soil_ph' : str(soil_ph_avg),
            'air_temp' : str(air_temp_avg),
            'air_hum' : str(air_hum_avg),
            'rain_val' : str(rain_val_avg)}
        record.insert_one(new_val)
        exit()
    time.sleep(0.5)




