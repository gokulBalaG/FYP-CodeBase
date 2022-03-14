import pyfirmata
import time
import csv 



board = pyfirmata.Arduino('COM4')
it = pyfirmata.util.Iterator(board)

file_name = "cropandscore.csv"



gas_sensor = board.get_pin('a:0:i')
rain_sensor = board.get_pin('a:1:i')




gas_value = gas_sensor.read()
rain_value = rain_sensor.read()

print('Gas value : ' , gas_value)
print('Rain value : ' , rain_value)

crop_score = (gas_value + rain_value)*3.0

with open(file_name, 'r') as f:
    data = csv.reader(f) 
    for row in data:
        #print(row[1])
        if (int(row[1]) == crop_score):
            print(row[0])
            break