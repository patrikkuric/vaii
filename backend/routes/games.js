const express = require('express');
const Game = require("../models/game");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add-game', function (req, res) {
    const { title, description, genre, platform, price, releaseDate, developer, publisher, imageUrl } = req.body;

    const game = new Game({
        title,
        description,
        genre,
        platform,
        price,
        releaseDate,
        developer,
        publisher,
        imageUrl,
    });

    game.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            if (error.code === 11000) { // MongoDB duplicate key error code
                console.log('Cannot create this game, a game with this title already exists!');
                res.status(400).send('Cannot create this game, a game with this title already exists!');
            } else {
                console.log(error);
                res.status(500).send('Internal Server Error');
            }
        });
});

router.post('/update-game', function (req, res) {
    const title = req.body.title;
    const updateData = req.body;

    Game.findOneAndUpdate(
        { title: title },
        updateData,
        { new: true }
    )
        .then((updatedGame) => {
            if (updatedGame) {
                res.send(updatedGame);
            } else {
                console.log(`Game with title '${title}' not found..`);
                res.status(404).send(`Game with title '${title}' not found.`);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/delete-game', function (req, res) {
    const title = req.body.title;

    Game.findOneAndDelete({ title: title })
        .then((result) => {
            if (result) {
                console.log(`Game with title '${title}' has been deleted successfully.`);
                res.send(`Game with title '${title}' has been deleted successfully.`);
            } else {
                console.log(`Game with title '${title}' was not not found.`);
                res.status(404).send(`Game with title '${title}' was not not found.`);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});



module.exports = router;