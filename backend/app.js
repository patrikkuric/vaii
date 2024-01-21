const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Game = require('./models/game');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const tokenRouter = require('./routes/token');
const reviewsRouter = require('./routes/reviews');
const ordersRouter = require('./routes/orders');
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/token', tokenRouter);
app.use('/reviews', reviewsRouter);
app.use('/orders', ordersRouter);

module.exports = app;
