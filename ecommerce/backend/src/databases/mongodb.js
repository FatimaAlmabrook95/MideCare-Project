// Import the mongoose module
const mongoose = require("mongoose");
const {db} = require('../config/config')
// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
// const mongoDB = "mongodb://127.0.0.1/my_database";
// const mongoDB = `mongodb://${db.host}/${db.database}`;
const mongoDB = db.url;


// Wait for database to connect, logging an error if there is a problem 
const connect = async () => {
  await mongoose.connect(mongoDB);
}
module.exports = connect;
