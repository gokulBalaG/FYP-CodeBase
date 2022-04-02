const { DB_URL } = require('./config.js');
const { MongoClient } = require('mongodb');

const client = new MongoClient(DB_URL);
const dbName = 'sensor_data';
const collectionName = 'sensor_records';

exports.run = async function () {
  try {
    await client.connect();

    console.log('Connected correctly to server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // let personDocument = {
    //   name: { first: "Alan", last: "Turing" },
    //   birth: new Date(1912, 5, 23), // May 23, 1912
    //   death: new Date(1954, 5, 7), // May 7, 1954
    //   contribs: ["Turing machine", "Turing test", "Turingery"],
    //   views: 1250000,
    // };

    // const p = await collection.insertOne(personDocument);

    const myDoc = await collection.findOne();
    console.log(myDoc);
    console.log('Doc fetched');

    return myDoc;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};
