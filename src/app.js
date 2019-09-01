require('dotenv').config();

// import modules
const express = require('express');
const morgan = require('morgan');
const dbConnector = require('./config/mongo-db');

// import routers
const apiRouter = require('./routes/api');

const app = express();

// Connect database
dbConnector();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', apiRouter);

module.exports = app;
