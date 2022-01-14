const express = require('express')
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne)

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.remove)

module.exports = router;