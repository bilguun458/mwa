require("dotenv").config()
const express = require('express')
const path = require('path')
const routes = require("./api/routes")
const dbConnection = require("./api/data/dbConnection")
const db = require("./api/data/db")
const app = express()

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
dbConnection.open();

const server = app.listen(process.env.PORT, function () {
    console.log(`listening ${server.address().port}`);
})