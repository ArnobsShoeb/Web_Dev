const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const mongoDB = require('./db');

const startServer = async () => {
    await mongoDB(); // Connect to MongoDB

    // Basic route to test server connection
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // Serve static files from the 'uploads' directory under '/api'
    app.use('/api', express.static(path.join(__dirname, 'uploads')));

    // CORS middleware
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    // Parse incoming JSON requests
    app.use(express.json());

    // API routes
    app.use('/api', require("./Routes/CreateUser"));
    app.use('/api', require("./Routes/LoginUser"));
    app.use('/api', require('./Routes/SendResetEmail'));
    app.use('/api', require('./Routes/VerifyOTP'));
    app.use('/api', require('./Routes/FetchUserData'));
    app.use('/api', require('./Routes/SetProPic'));
    app.use('/api', require('./Routes/SetProPic'));
    app.use('/uploads', express.static(path.join(__dirname,'uploads')));
    // Start the server
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();
