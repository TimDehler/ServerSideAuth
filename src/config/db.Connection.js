const { Client } = require("pg");
const dotenv = require("dotenv").config();

let client;

const connectDB = () => {
  const connectionString = `${process.env.DBS_CONNECTIONSTRING}/postgres`;

  try {
    client = new Client({
      connectionString: connectionString,
    });

    client.connect();
    console.log("Connection established");

    return client;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

module.exports = connectDB;
