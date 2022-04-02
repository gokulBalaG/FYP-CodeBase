from pymongo import MongoClient
import pyfirmata 
import time 

board = pyfirmata.Arduino('COM4')
client = MongoClient("mongodb+srv://XXXX:XXXX@sensordata.4x7l6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

it = pyfirmata.util.Iterator(board)
it.start()

i = 0
gas_avg = 0
rain_avg = 0

while True:
    board.analog[0].enable_reporting()
    board.analog[1].enable_reporting()
    rain_val = board.analog[0].read()
    gas_val = board.analog[1].read()
    if gas_val == None:
        gas_val = 0
    if rain_val == None:
        rain_val = 0
    gas_avg = gas_avg + gas_val
    rain_avg = rain_avg + rain_val
    #print(gas_val)
    i = i + 1
    if(i==10):
        gas_avg = '%.3f'%(gas_avg/10)
        rain_avg = '%.3f'%(rain_avg/10)

        print(f"Average gas value : {gas_avg}")
        print(f"Average rain value : {rain_avg}")
        db = client.get_database('sensor_data') #db Name
        record = db.sensor_records  #document name
        new_val = {'gas_val' : str(gas_avg),
            'rain_val' : str(rain_avg)}
        record.insert_one(new_val)
        exit()
    time.sleep(0.5)




