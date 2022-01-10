const fs = require("fs")

console.log("1: start app");

fs.readFile("largeFile.txt", function (err, buffer) {
    console.log("2: Got file: ", buffer.toString().substring(0, 21));
});

console.log("3: end");