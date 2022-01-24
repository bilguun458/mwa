const express = require('express')
const router = express.Router();
const brandsController = require("../controllers/brands.controllers")
const bikesController = require("../controllers/bikes.controllers")

router.route("/brands")
    .get(brandsController.getAll)
    .post(brandsController.addOne)

router.route("/brands/:brandId")
    .get(brandsController.getOne)
    .delete(brandsController.remove)
    .put(brandsController.updateFull)

router.route("/brands/:brandId/bikes")
    .get(bikesController.getAll)
    .post(bikesController.addOne)

router.route("/brands/:brandId/bikes/:bikeId")
    .get(bikesController.getOne)
    .delete(bikesController.remove)
    .put(bikesController.updateFull)

module.exports = router;