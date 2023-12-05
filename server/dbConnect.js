const mongoose = require('mongoose');

module.exports = async() => {
    const mongoUri = process.env.MONGO_URI;

    try {
        const connect = await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }   
}





// // const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config('./env');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongoUri = process.env.MONGO_URI;

// const client = new MongoClient(mongoUri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// module.exports = async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
