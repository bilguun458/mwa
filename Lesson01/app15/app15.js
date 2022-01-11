const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serveIndexPage = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(statusCode);
    res.end(indexFileBuffer);
}

const server = http.createServer(serveIndexPage);

fs.readFile(__dirname + "/indexWrong.html", function (err, buffer) {
    if (err) {
        indexFileBuffer = "file not found";
        statusCode = 404;
    } else {
        indexFileBuffer = buffer;
        statusCode = 200;
    }

    server.listen(8080, "localhost", function () {
        console.log("Server running");
    })
});