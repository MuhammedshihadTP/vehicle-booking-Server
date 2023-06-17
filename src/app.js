const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');



const app = express();

configDotenv()

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
const db_url = process.env.MONGODB_URL

mongoose.connect(db_url).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
})


// API routes
const userrouter = require('./router/user')
app.use(userrouter)
module.exports = app