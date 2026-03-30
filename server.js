require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const app = express();
const sessionConfig = require('./config/sessionConfig');
const connectDB = require('./config/db');

connectDB(); 


const authRoutes = require('./routes/auth');

app.use(express.json());


app.use(sessionConfig);

app.use('/auth', authRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000 my Lord");
});