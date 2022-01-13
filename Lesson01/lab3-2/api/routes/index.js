const express = require('express')
const router = express.Router();
const calcController = require("../controllers/calc.controllers")

router.route("/multiply/:number")
    .post(calcController.multiply)

module.exports = router;