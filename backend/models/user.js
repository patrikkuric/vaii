const mongoose = require('mongoose');ň

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "Visitor"
    },
    image: {
        type: String,
        default: "/userImages/default.png"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;