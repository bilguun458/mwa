const express = require('express')
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get(gamesController.getAll)

router.route("/games/:gameId")
    .get(gamesController.getOne)

module.exports = router;