const express = require('express')
const router = express.Router();
const schoolController = require("../controllers/school.controllers")

router.route("/students")
    .get(schoolController.getAll)

router.route("/students/:id")
    .get(schoolController.getOne)

module.exports = router;