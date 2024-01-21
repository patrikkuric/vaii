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

router.get('/', async function (req, res) {
    const games = await Game.find();
    res.json(games);
});

router.get('/:title', async function (req, res) {
    const { title } = req.params;

    const game = await Game.findOne({ title: title });

    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).send(`Game with title '${title}' not found.`);
    }
});

router.post('/add-game', upload.single('image'), async function (req, res) {
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
        res.status(200).json(savedGame);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Cannot create this game, a game with this title already exists!');
        } else {
            res.status(500).send('Server-side error');
        }
    }
});

router.put('/update-game/:title', upload.single('image'), async function (req, res) {
    const { title } = req.params;

    const updateData = {};

    const description = req.body.description;
    const genres = req.body.genres;
    const platforms = req.body.platforms;
    const price = req.body.price;
    const releaseDate = req.body.releaseDate;
    const developer = req.body.developer;
    const publisher = req.body.publisher;

    if (description) updateData.description = description;
    if (genres) updateData.genres = genres;
    if (platforms) updateData.platforms = platforms;
    if (price) updateData.price = price;
    if (releaseDate) updateData.releaseDate = releaseDate;
    if (developer) updateData.developer = developer;
    if (publisher) updateData.publisher = publisher;
    if (req.file) updateData.imageUrl = req.file.filename;

    try {
        const updatedGame = await Game.findOneAndUpdate({ title: title }, updateData, { new: true });

        if (updatedGame) {
            res.status(200).json(updatedGame);
        } else {
            res.status(404).send(`Game with title '${title}' not found.`);
        }
    } catch (error) {
        res.status(500).send('Server-side Error');
    }
});

router.post('/delete-game/:title', async function (req, res) {
    const { title } = req.params;

    try {
        const result = await Game.findOneAndDelete({ title: title });

        if (result) {
            res.send(`Game with title '${title}' has been deleted successfully.`);
        } else {
            res.status(404).send(`Game with title '${title}' was not found.`);
        }
    } catch (error) {
        res.status(500).send('Server-side Error');
    }
});

module.exports = router;