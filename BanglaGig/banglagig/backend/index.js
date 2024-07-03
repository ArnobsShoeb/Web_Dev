const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db');

const startServer = async () => {
  await mongoDB(); 

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-with,Content-Type,Accept"
    );
    next();
  })
  app.use(express.json());
  app.use('/api',require("./Routes/CreateUser"));
  app.use('/api',require("./Routes/LoginUser"));
  app.use('/api', require('./Routes/SendResetEmail'));
  app.use('/api', require('./Routes/VerifyOTP'));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
