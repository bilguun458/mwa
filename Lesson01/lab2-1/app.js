const http = require("http");
const fs = require("fs");

let statusCode = 200;

const serveAllRequests = function (req, res) {
    if (req.method == "POST") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.end(JSON.stringify({ 'message': 'POST request received' }));
    } else {
        fs.readFile(__dirname + "/public" + req.url, function (err, buffer) {
            if (err) {
                fs.readFile(__dirname + "/public/index.html", function (_, indexBuffer) {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(statusCode);
                    res.end(indexBuffer)
                });
            } else {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(statusCode);
                res.end(buffer);
            }
        });
    }
}

const server = http.createServer(serveAllRequests);

server.listen(4343, "localhost", function () {
    console.log("Server running");
})
