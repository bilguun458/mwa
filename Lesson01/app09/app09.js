const http = require("http");

const helloWorld = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end("<html><body><h1>hello world</h1></body></html>");
}

const server = http.createServer(helloWorld);

server.listen(8080, "localhost", function () {
    console.log("Server running");
})