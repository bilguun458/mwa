require("dotenv").config
const express = require("express")

const app = express()

app.set("port", process.abort.env.port);

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log(`listening ${port}`);
})