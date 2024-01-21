const express = require('express');
const Game = require("../models/game");
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const games = await Game.find();
    res.json(games);
});

router.get('/:title', async (req, res) => {
    const { title } = req.params;

    const game = await Game.findOne({ title: title });

    if (game) {
        res.json(game);
    } else {
        res.status(404).send(`Game with title '${title}' not found.`);
    }
});

router.post('/add-game', upload.single('image'), async (req, res) => {
    const { title, description, genres, platforms, price, releaseDate, developer, publisher } = req.body;

    const imageUrl = req.file ? req.file.filename : null;

    const game = new Game({
        title,
        description,
        genres,
        platforms,
        price,
        releaseDate,
        developer,
        publisher,
        imageUrl
    });

    try {
        const savedGame = await game.save();
        res.json(savedGame);
    } catch (error) {
        if (error.code === 11000) {
            console.log('Cannot create this game, a game with this title already exists!');
            res.status(400).send('Cannot create this game, a game with this title already exists!');
        } else {
            console.error('Unexpected error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
});

router.put('/update-game/:title', upload.single('image'), async (req, res) => {
    const { title } = req.params;

    const updateData = {};

    const description = req.body.description;
    if (description) {
        updateData.description = description;
    }

    const genres = req.body.genres;
    if (genres) {
        updateData.genres = genres;
    }

    const platforms = req.body.platforms;
    if (platforms) {
        updateData.platforms = platforms;
    }

    const price = req.body.price;
    if (price) {
        updateData.price = price;
    }

    const releaseDate = req.body.releaseDate;
    if (releaseDate) {
        updateData.releaseDate = releaseDate;
    }

    const developer = req.body.developer;
    if (developer) {
        updateData.developer = developer;
    }

    const publisher = req.body.publisher;
    if (publisher) {
        updateData.publisher = publisher;
    }

    if (req.file) {
        updateData.imageUrl = req.file.filename;
    }

    try {
        const updatedGame = await Game.findOneAndUpdate({ title: title }, updateData, { new: true });

        if (updatedGame) {
            res.json(updatedGame);
        } else {
            console.log(`Game with title '${title}' not found.`);
            res.status(404).send(`Game with title '${title}' not found.`);
        }
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-game/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const result = await Game.findOneAndDelete({ title: title });

        if (result) {
            console.log(`Game with title '${title}' has been deleted successfully.`);
            res.send(`Game with title '${title}' has been deleted successfully.`);
        } else {
            console.log(`Game with title '${title}' was not found.`);
            res.status(404).send(`Game with title '${title}' was not found.`);
        }
    } catch (error) {
        console.error('Unexpected error:', error.message);
    }
});

module.exports = router;