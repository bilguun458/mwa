const mongoose = require("mongoose")
require("./movies.model")

mongoose.connect(process.env.DB_URL)

mongoose.connection.on("connect", function () {
    console.log("mongoose connected");
})
mongoose.connection.on("disconnect", function () {
    console.log("mongoose disconnected");
})
mongoose.connection.on("error", function () {
    console.log("mongoose error");
})

process.on("SIGINT", function () {
    mongoose.connection.close(
        function () {
            console.log("SIGINT");
            process.exit()
        }
    )
})