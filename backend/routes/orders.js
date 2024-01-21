const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');  // Import the User model

router.post('/add-order', async (req, res) => {
    const { username, gameID, orderedAt } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).send('User not found!');
        }

        const existingOrder = await Order.findOne({ user: user._id, game: gameID });

        if (existingOrder) {
            return res.status(400).send('Game already ordered!');
        }

        const order = new Order({
            user: user._id,
            game: gameID,
            orderedAt: orderedAt,
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).send('Error creating order:');
    }
});

router.get('/user/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const userOrders = await Order.find({ user: user._id })
            .populate('game')
            .select('game orderedAt');

        res.status(200).json(userOrders);
    } catch (error) {
        console.error(`Error fetching orders for user '${username}':`, error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-order', async function (req, res) {

    const { id } = req.body;
    console.log(id);

    try {
        const orderToBeDeleted = await Order.findByIdAndDelete({ _id: id });

        if (!orderToBeDeleted) {
            return res.status(404).send('Order not found');
        }

        res.status(200).send(orderToBeDeleted);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;