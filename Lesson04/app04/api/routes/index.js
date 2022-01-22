const express = require('express')
const router = express.Router();
const gamesController = require("../controllers/games.controllers")
const publisherController = require("../controllers/publisher.controllers")
const reviewController = require("../controllers/reviews.controllers")

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne)

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.remove)

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne)
    .post(publisherController.addOne)

router.route("/games/:gameId/reviews")
    .get(reviewController.getAll)

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewController.getOne)

module.exports = router;