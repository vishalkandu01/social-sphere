// const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config('./env');

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
