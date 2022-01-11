const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serveAllRequests = function (req, res) {
    switch (req.url) {
        case "/json":
            statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end("{'message': 'hello world}");
            break;
        case "/":
            fs.readFile(__dirname + "/index.html", function (err, buffer) {
                if (err) {
                    indexFileBuffer = "file not found";
                    statusCode = 404;
                } else {
                    indexFileBuffer = buffer;
                    statusCode = 200;
                }
            });
            res.setHeader("Content-Type", "text/html");
            res.writeHead(statusCode);
            res.end(indexFileBuffer);
            break;

    }


}

const server = http.createServer(serveAllRequests);

server.listen(8080, "localhost", function () {
    console.log("Server running");
})
// fs.readFile(__dirname + "/index.html", function (err, buffer) {
//     if (err) {
//         indexFileBuffer = "file not found";
//         statusCode = 404;
//     } else {
//         indexFileBuffer = buffer;
//         statusCode = 200;
//     }

//     server.listen(8080, "localhost", function () {
//         console.log("Server running");
//     })
// });