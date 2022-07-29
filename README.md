# Smart Agricare


## Motivation

Most of the farmers today decide on the crops that can be grown, fertilizers that needs to be used and the amount of water that needs to be provided in a probability basis. This may not be the most precise way of deciding the conditions that needs to be maintained for the [roper growth of the land.Other systems include implementation of agricultural field monitoring using Bluetooth and WiFi. But these systems have their own pros and cons. The range of Bluetooth is very limited due to which large fields may not be monitored effectively. WiFi implementation requires WiFi to be accessible by all nodes deployed on the land. This may require powerful antennas, due to which the cost of the system may increase. LoRa (Long range) technology proves to overcome the disadvantages of both of these systems by consuming very less power and providing a long range.

The motto of our project is to better visualise various conditions of the agricultural land, process and analyse those conditions to suggest crops that can be grown and  fertilisers that can be used for the better growth of the crops. Providing such a technical view of the land allows the farmer to make better decision the crops that can be grown, fertilizers that can be used and the amount of water that needs to be provided to the land. All of these are made available to the farmer through an easy to use user interface.

## Problem Statement

To develop and implement a real-time system for visualisation of various parameters of the agricultural land. This system should be capable of suggesting the crops for cultivation, suggesting the fertiliser needed for the proper growth of the plant and visualising the water demand for various parts of the land. All of this is based on various parameters gathered from the on field sensors and weather information gathered using the API’s.


## Design and implementation of Smart Agricare

### Hardware Implementation 

The hardware implementation includes 2 parts. The first is the sender node and the second is the receiver node. The sender node is responsible for transmitting the data from field to the receiver node. The receiver node is responsible for receiving the on field data and handing it over to the updating program. The implementation of these nodes are explained further.

**1. Sender Node**

The sender node consists of Arduino Uno for processing the data gathered from the sensor. There are 2 sensors attached to the sender node. These are rain sensor, to measure the rain value at the field and moisture sensor, to measure the moisture of the land. A servo motor is also interfaced to the sender node. This is to implement an automatic water pump system that waters that part of the land that requires water. The decision is made based on the gathered sensor values.A Lora transmitter module is also interfaced with the Arduino. The sensor values are transmitted using this interfaced module. You can find the arduino code for the sender node [here](/hardwareUpdates/loraArduinoSender/loraArduinoSender.ino) 

**2. Receiver Node**

The receiver node consists of an Arduino Uno interfaced with a receiver Lora module. The data from the transmitter end is received by the receiver and is processed by the Arduino. Once the data is received, the an updation script is triggered at the receiver's end. This script is responsible for reading the sensor data at the receiver's end and gathering the data from API. These data are updated to the database. You can find the arduino code for the sender node [here](/hardwareUpdates/loraReceiver/loraReceiver.ino) 

### Software Implementation

The software implementation consists of website development, a machine learning model for crop prediction and an API to host the ML model and Heroku for deployment.The website development again consists of two parts - frontend and backend. The frontend is built using HTML, CSS and JavaScript. The backend is built using NodeJS for the server and MongoDB as the database. ExpressJS framework in NodeJS is used for building the server that is hosting the website. As the application requires authentication as well, we are using PassportJS, which is a NodeJS package that allows for various level of authentication for applications like these. It has various strategies for enabling authentication in applications.For the database, MongoDB provides a cloud database service called MongoDB-Atlas. Atlas is used as the main database where the user data is stored for processing.

**1. Website**

 The website first starts with a user registering. Once registered, the user is provided with services like weather forecast, crop suggestion, fertilizer suggestion & current land status. Each of these services are implemented as follows: 

* Weather Forecast

     The user is prompted to either enter the city name or allow the browser to fetch the co-ordinates as per the IP address of the request. Once this information is collected, the backend makes a GET request to a weather API called 'openweathermap' which returns the weather report which is presented to the user.

* Crop suggestion

     A ML model is trained to predict the crops that can be grown on the soil. For this prediction, we are using 7 parameters - N (nitrogen), P (Phosphorus), K (Potassium), temperature of surrounding, surrounding humidity, soil pH and rainfall. The model is trained over a dataset that has 2200 entries with 100 entries for each crop, totalling upto 22 crops. The user is prompted to input the N, P and K values of the soil and rest parameters are collected from the database. The database is regularly updated with temperature, humidity, pH and rainfall. Once the N, P, and K values are inputted, this data is sent to the ML model for prediction and the results are shown to the user. The ML model is served over an API that responds to the incoming requests and responds back with the prediction.

* Fertilizer suggestion

     The same dataset that is used for crop suggestion is used here, but for each crop all the 100 entries are averaged and concised into a single entry, therefore this new dataset consists of only 22 entries, one for each crop. The user is prompted to input the N, P and K values of the soil and the current crop that he/she is growing, this data is sent to the backend and the corresponding fertilizer suggestion is sent and shown to user.

* Current land status

     Provides a graphical representation to analyze the field conditions. This feature provides two views - a chart and a table. The chart is plotted using chartjs-node-canvas package in NodeJS.

**2. Machine learning**

 A machine learning model is used for predicting a crop that can be grown for a given land conditions. For this model, a dataset of 2200 entries was used, which contains data for 22 crops, each crop having 100 entries. The dataset fields include N (Nitrogen content in soil), P (Phosphorus content in soil), K (Potassium content in soil), temperature (degree Celcius), surrounding humidity (relative humidity in \%), soil pH and rainfall (in mm).

 The dataset was trained with 5 algorithms - Decision tree, Naive Bayes, SVM, Logistic regression and Random Forest. The obtained accuracies in each case were 90\%, 99.09\% 97.95\%, 95.22\% and 99.09\% respectively. Random forest gives the maximum accuracy followed by Naive Bayes and hence the Random forest algorithm was used for the crop prediction.Decision tree is used in our project as an approach in machine learning to structure the algorithm. A decision tree algorithm will be used to split dataset features through a cost function. The decision tree is grown before being optimised to remove branches that may use irrelevant features, a process called pruning.we are using random forest for our implementation because it builds multiple decision trees and merges them together to get a more accurate and stable prediction.
Link to crop prediction & fertilizer suggestion repo
[here](https://github.com/gokulBalaG/FYP-CodeBase-ML-deployment)

**3. API to serve the machine learning model**

 To serve the ML model for crop prediction and fertilizer suggestion we built an API which will receive requests from the main application (website) and respond with predictions. This was achieved using the Flask framework in python. Since the ML model was built in Python, we use python to build this API. The API consists of two routes - "/crop-prediction" and "/fertilizer-suggestion". Each of these routes are accessed by the main application for their specific uses.This API receives GET requests, extracts the parameters and feeds it into the model for prediction. JSON format is used for communication between these applications (the API and the website). Both the website and the API are hosted in cloud using a hosting service called Heroku.
 
 ## Results and Discussion
 
 To ease the efforts of the farmer for the cultivation by setting up a remotely controlled precision irrigation system. System also provides the knowledge of which crop can be grown after analysing the weather and soil parameters, and suggests to the farmers about which fertiliser should be added for the efficient growth of the plant.
 
 The mode of demonstration is done using a small prototype   field which is fixed with basic sensors and components needed for the automation. For demonstration, the water pump with servo motor is fixed for precision irrigation mechanisms. The plants are grown `on a small scale model for demonstration purposes. The home page of the website is as shown : 
![homepage](/images/home.png)

All gathered information of the land is presented in the website. The website is built in an easy to use and visually appealing manner. The user has to create an account with the necessary details. When the user logs into the account, the land details visible to the user will be of the specific account. When ever the parameters collected from the land changes, the data will be dynamically updated in the database as well as the website.

The data from the land and API is gathered at the receiver end and is updated in the database.A node is present at the field. This node is a combination of Arduino UNO interfaced with the respective sensors. The data collected from the hardware on field are rainfall value and humidity. This data collected on field is transmitted to the receiver through the Lora module. The data gathered from the API are temperature and pH. This is done at the receiver's end. All the collected values are updated in the MongoDB. Snippet of the database is shown in Figure :
![db](/images/mongodb.png)

The collected data from hardware and API helps the user for crop analysis and also the health of soil. This graphical presentation helps the user to understand the land better. The user will be able to make better decisions base don the values presented. A graphical representation shows how the data is varying over a long time. This is shown in Figure 4.5. The system also presents the data in a tabular form. Thus the user will be able to make precise decision based on these values. 
![chart](/images/view-land-status-chart.png)
![table](/images/view-land-status-table.png)

User enters the NPK (Nitrogen, Phosphorous and Potassium) value.The crop suggestion system, which is based on Random forest uses all the collected data from the database and the user entered values, processes these information to predict the suitable crop to grow.  The website takes input from the user of their current location and renders data which are relevant to weather of that particular geographical region as shown in Figure . This data is used for presenting the information on the website and to suggest crops.
![crop-suggestion-ip](/images/crop-suggestion-1-input.png)

The suggested crop is shown as follows :
![crop-suggestion-op](/images/crop-suggestion-2-output.png)

One of the additional feature is that weatherforecast is also presented to the user. The user will be able to take decisions on the amount of water that needs to be supplied to the field. This feature can be used to desing a smart irrigation system. 
![weather-forecast](/images/weather-forecast-1-input.png)  
![weather-forecast-table](/images/weather-forecast-2-output.png)


