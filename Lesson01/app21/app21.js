require("dotenv").config()
const express = require("express")

const app = express()

app.set("port", process.env.PORT);

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log(`listening ${port}`);
})