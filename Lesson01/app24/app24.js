require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

app.get("/json", function (req, res) {
    console.log("json received");
    res.status(200).send({ "isJson": true })
})

app.get("/file", function (req, res) {
    console.log("file received");
    res.status(200).sendFile(path.join(__dirname, '/app22.js'));
})

app.use("/static", express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function () {
    console.log(`listening ${server.address().port}`);
})