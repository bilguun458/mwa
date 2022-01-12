const express = require('express')
const router = express.Router();

router.route("/json").get(function (req, res) {
    console.log("json received");
    res.status(200).send({ "isJson": true })
})

module.exports = router;