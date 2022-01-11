const http = require("http");

const helloWorld = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end("{'message': 'hello world'}");
}

const server = http.createServer(helloWorld);

server.listen(8080, "localhost", function () {
    console.log("Server running");
})