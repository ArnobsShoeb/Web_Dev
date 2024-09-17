const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const path = require('path');
const mongoDB = require('./db');

const startServer = async () => {
    await mongoDB(); // Connect to MongoDB

    // CORS middleware - Allow requests from localhost:3000
    app.use(cors({
        origin: 'http://localhost:3000', // Allow only your frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
        credentials: true // Allow credentials if needed
    }));

    // Basic route to test server connection
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // Serve static files from the 'uploads' directory under '/api'
    app.use('/api', express.static(path.join(__dirname, 'uploads')));

    // Parse incoming JSON requests
    app.use(express.json());

    // API routes
    app.use('/api', require("./Routes/CreateUser"));
    app.use('/api', require("./Routes/LoginUser"));
    app.use('/api', require('./Routes/SendResetEmail'));
    app.use('/api', require('./Routes/VerifyOTP'));
    app.use('/api', require('./Routes/FetchUserData'));
    app.use('/api', require('./Routes/SetProPic'));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use('/api', require('./Routes/TopUp'));
    app.use('/api', require('./Routes/SubmitPayment'));



    // Start the server
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();
