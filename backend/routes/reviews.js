const express = require('express');
const Review = require("../models/review");
const Game = require("../models/game");
const User = require("../models/user"); // Import the User model
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user');
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:gameID', async (req, res) => {
    const { gameID } = req.params;

    try {
        const reviews = await Review.find({ game: gameID }).populate('user').populate('game');
        res.status(200).json(reviews);
    } catch (error) {
        console.log(`Error fetching reviews for game '${gameID}':`);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/add-review', async function (req, res) {
    const { reviewText, rating, username, gameTitle, date } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const game = await Game.findOne({ title: gameTitle });
        if (!game) {
            return res.status(404).send("Game not found");
        }

        const review = new Review({
            user: user,
            game: game,
            content: reviewText,
            rating: rating,
            createdAt: date
        });

        const savedReview = await review.save();

        res.status(201).send(savedReview);
    } catch (error) {
        console.error('Error saving review:', error);
    }
});

router.post('/update-review', async (req, res) => {
    const { reviewID, updatedText } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(reviewID, { content: updatedText }, { new: true });

        if (!review) {
            return res.status(404).send('Review not found');
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error updating review:', error);
    }
});

router.post('/delete-review', async function (req, res) {
    const { reviewID } = req.body;
    console.log(reviewID);

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewID);

        if (!deletedReview) {
            return res.status(404).send('Review not found');
        }

        res.status(200).send(deletedReview);
    } catch (error) {
        console.error('Error deleting review:', error);
    }
});

module.exports = router;