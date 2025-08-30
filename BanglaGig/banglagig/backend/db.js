const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arnobshoeb:banglagig123@cluster0.xke0xgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
