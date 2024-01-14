const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    genres: [{
        type: String,
        required: true,
    }],
    platforms: [{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    developer: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;