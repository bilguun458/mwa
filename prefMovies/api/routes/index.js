const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/movies.controllers")

router.route("/movies")
    .get(moviesController.getAll)
    .post(moviesController.addOne)

router.route("/movies/:id")
    .get(moviesController.getOne)
    .delete(moviesController.deleteOne)

module.exports = router