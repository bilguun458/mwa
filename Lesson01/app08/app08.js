const childProcess = require("child_process")

console.log("1: Start");

setTimeout(function () {
    console.log("One second has passed");
}, 1000);

const newProcess = childProcess.spawn("node", ["fibonacci.js"], { stdio: "inherit" });

console.log("1: End");