require('dotenv').config();

// import modules
const express = require('express');
const morgan = require('morgan');

// import routers
const apiRouter = require('./routes/api');

const app = express();

// Connect database
// db();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', apiRouter);

module.exports = app;