require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res) {
    if (req.method == "POST") {
        res.status(200).send({ "message": "POST request received" })
    } else {
        res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
    }
})

const server = app.listen(process.env.PORT, function () {
    console.log(`listening ${server.address().port}`);
})