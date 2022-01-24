const mongoose = require("mongoose");
require("./xc-bikes.model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("Connnected mongoose " + process.env.DB_URL);
})

mongoose.connection.on("disconnected", function () {
    console.log("Disconnected mongoose " + process.env.DB_URL);
})

mongoose.connection.on("err", function (err) {
    console.log("Connection err mongoose " + err);
})

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MSG);
        process.exit()
    })
}) 
