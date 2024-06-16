const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db');

const startServer = async () => {
  await mongoDB(); 

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use(express.json());
  app.use('/api',require("./Routes/CreateUser"));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();

// {
//     "firstname":"Shoeb",
//     "lastname":"Mahfuz",
//     "email":"arnobshoeb@gmail.com",
//     "password":"123456",
//     "usertype":"Seller"
//     }