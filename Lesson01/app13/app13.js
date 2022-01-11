const http = require("http");
const fs = require("fs");

const readIndex = function (req, res) {
    fs.readFile(__dirname + "/index.html", function (err, buffer) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(buffer);
    });
}

const server = http.createServer(readIndex);

server.listen(8080, "localhost", function () {
    console.log("Server running");
})