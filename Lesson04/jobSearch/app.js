const express = require("express")
require("dotenv").config()

const path = require("path")
require("./api/db/db.js")
const routes = require("./api/routes")

const app = express()

// app.use()
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept")
    next();
})

app.use("/api", routes)

const server = app.listen(process.env.PORT, function () {
    console.log("listening: ", server.address().port);
})