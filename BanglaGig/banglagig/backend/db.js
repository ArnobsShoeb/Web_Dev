const mongoose = require('mongoose');
const mongoURI = 'mongodb://arnobshoeb:banglagig123@ac-ngevuoc-shard-00-00.krdl1rd.mongodb.net:27017,ac-ngevuoc-shard-00-01.krdl1rd.mongodb.net:27017,ac-ngevuoc-shard-00-02.krdl1rd.mongodb.net:27017/BanglaGig?ssl=true&replicaSet=atlas-zlgi90-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = mongoDB;
