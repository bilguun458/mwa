require("dotenv").config()
const express = require("express")
require("./api/data/db")
const routes = require("./api/routes")

const app = express()

app.use(express.json())

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
    next()
})

app.use("/api", routes)

const server = app.listen(process.env.PORT, function () {
    console.log("running on: " + server.address().port);
})