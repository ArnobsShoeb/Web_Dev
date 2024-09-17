const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;
const mongoDB = require('./db');

const startServer = async () => {
    await mongoDB(); // Connect to MongoDB

    // CORS middleware - Allow requests from localhost:3000
    app.use(cors({
        origin: 'http://localhost:3000', // Allow only your frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
        credentials: true // Allow credentials if needed
    }));

    // Middleware to set CORS headers (if additional customization needed)
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
    app.use('/api', require('./Routes/SetProPic'));
    app.use('/api', require('./Routes/TopUp'));
    app.use('/api', require('./Routes/SubmitPayment'));

    // Root route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

startServer();
