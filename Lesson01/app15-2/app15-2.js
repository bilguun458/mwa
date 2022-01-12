const http = require("http");
const fs = require("fs");
const { callbackify } = require("util");

let indexFileBuffer;
let statusCode = 200;

const handleFile = function (url, callback) {
    fs.readFile(__dirname + url, function (err, buffer) {
        if (err) {
            indexFileBuffer = "file not found";
            statusCode = 404;
            return
        } else {
            indexFileBuffer = buffer;
            statusCode = 200;
        }
        callback();
    });
}

const serveAllRequests = function (req, res) {

    console.log("----" + req.url);
    handleFile(req.url, function () {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(statusCode);
        res.end(indexFileBuffer);
    });
    // switch (req.url) {
    //     case "/json":
    //         statusCode = 200;
    //         res.setHeader("Content-Type", "application/json");
    //         res.writeHead(statusCode);
    //         res.end("{'message': 'hello world}");
    //         break;
    //     case "/":
    //         fs.readFile(__dirname + "/index.html", function (err, buffer) {
    //             if (err) {
    //                 indexFileBuffer = "file not found";
    //                 statusCode = 404;
    //             } else {
    //                 indexFileBuffer = buffer;
    //                 statusCode = 200;
    //             }
    //         });
    //         res.setHeader("Content-Type", "text/html");
    //         res.writeHead(statusCode);
    //         res.end(indexFileBuffer);
    //         break;

    // }


}

const server = http.createServer(serveAllRequests);

server.listen(8080, "localhost", function () {
    console.log("Server running");
})