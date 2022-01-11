const { spawn } = require("child_process")

const fibonacci = function (num) {
    spawn("node", ["assignment1/fibonacci.js", num], { stdio: "inherit" });
}

module.exports = {
    fibonacci
}
