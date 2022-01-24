require("dotenv").config()
const express = require('express')
const path = require('path')
const routes = require("./api/routes")
const app = express()

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept")
    next();
})

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
    console.log(`listening ${server.address().port}`);
})