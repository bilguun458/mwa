const http = require("http");
const fs = require("fs");

let indexFileBuffer;

const serveIndexPage = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFileBuffer);
}

const server = http.createServer(serveIndexPage);

fs.readFile(__dirname + "/index.html", function (err, buffer) {
    indexFileBuffer = buffer;
});

server.listen(8080, "localhost", function () {
    console.log("Server running");
})