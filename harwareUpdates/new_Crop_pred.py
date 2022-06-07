import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import pickle
import pyfirmata
import time


ah = 2.4
atemp = 13.87974371
shum = 82.00274423
pH = 6.502985292
rain = 153.9355362

l=[]
l.append(ah)
l.append(atemp)
l.append(pH)
l.append(rain)
predictcrop = [l]

# Putting the names of crop in a single list
crops = ['wheat','mungbean','Tea','millet','maize','lentil','jute','cofee','cotton','ground nut','peas','rubber','sugarcane','tobacco','kidney beans','moth beans','coconut','blackgram','adzuki beans','pigeon peas','chick peas','banana','grapes','apple','mango','muskmelon','orange','papaya','watermelon','pomegranate']
cr = 'rice'

fileName = "cropPredModel.sav"
clf = pickle.load(open(fileName, 'rb'))

#Predicting the crop
predictions = clf.predict(predictcrop)
count = 0
for i in range(0,30):
    if (predictions[0][i] == 1):
        c = crops[i]
        count = count+1
        break;
    i = i+1
if(count==0):
    print('The predicted crop is %s'%cr)
else:
    print('The predicted crop is %s'%c)
