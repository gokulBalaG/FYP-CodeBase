#importing the required libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import pickle


#Reading the csv file
data = pd.read_csv('cpdata.csv')


#Creating dummy variable for target i.e label
label = pd.get_dummies(data.label).iloc[: , 1:]
data = pd.concat([data,label],axis=1)
data.drop('label', axis=1,inplace=True)

train = data.iloc[:, 0:4].values
test = data.iloc[: ,4:].values


#Dividing the data into training and test set
X_train,X_test,y_train,y_test=train_test_split(train,test,test_size=0.3)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

from sklearn.tree import DecisionTreeRegressor
clf = DecisionTreeRegressor()

#Fitting the classifier into training set
clf.fit(X_train,y_train)



fileName = "cropPredModel.sav"
pickle.dump(clf, open(fileName, 'wb'))