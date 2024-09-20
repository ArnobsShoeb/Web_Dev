const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;
const mongoDB = require('./db');

// Connect to MongoDB
const startServer = async () => {
    await mongoDB();

    // CORS middleware
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));

    // Middleware to parse JSON bodies
    app.use(express.json());

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
    app.use('/api', require('./Routes/FetchMyGigs'));
    app.use('/api', require('./Routes/PlaceOrder'));
    app.use('/api', require('./Routes/FetchActiveOrders'));
    app.use('/api', require('./Routes/DeleteGig'));

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
