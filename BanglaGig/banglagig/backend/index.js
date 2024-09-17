const express = require('express');
const path = require('path'); // Import path module
const app = express();
const port = 4000;
const mongoDB = require('./db');

const startServer = async () => {
  await mongoDB(); 

  // Middleware to set CORS headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.json()); // Middleware to parse JSON bodies

  // Serve static files from 'uploads' directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // API routes
  app.use('/api', require('./Routes/CreateUser'));
  app.use('/api', require('./Routes/LoginUser'));
  app.use('/api', require('./Routes/SendResetEmail'));
  app.use('/api', require('./Routes/VerifyOTP'));
  app.use('/api', require('./Routes/FetchUserData'));
  app.use('/api', require('./Routes/PostGig'));
  app.use('/api', require('./Routes/GetGigs'));

  // Root route
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
