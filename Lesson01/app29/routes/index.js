const express = require('express')
const router = express.Router();

router.route("/json")
    .get(function (req, res) {
        console.log("json GET received");
        res.status(200).send({ "Json from GET": true })
    })
    .post(function (req, res) {
        console.log("json POST received");
        res.status(200).send({ "Json from POST": true })
    })

module.exports = router;