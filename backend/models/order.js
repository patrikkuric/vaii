const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
});

orderSchema.index({ user: 1, game: 1 }, { unique: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;