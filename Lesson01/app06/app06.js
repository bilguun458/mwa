const fs = require("fs")

console.log("1: start app");

const handleFile = function (err, buffer) {
    console.log("2: Got file: ", buffer.toString().substring(0, 21));
}

fs.readFile("largeFile.txt", handleFile);

console.log("3: end");