const fs = require("fs")

console.log("1: start app");

const buffer = fs.readFileSync("largeFile.txt");
console.log("2: Got file: ", buffer.toString().substring(0, 21));

console.log("3: end");