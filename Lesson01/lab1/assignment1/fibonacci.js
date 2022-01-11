const { argv } = require("process")

const fibonacci = function (num) {
    let number = Math.abs(num)
    if (number <= 2) return 1;
    else return fibonacci(number - 1) + fibonacci(number - 2);
}

const lastArgument = argv[argv.length - 1];
console.log(`fibonacci ${lastArgument}: `, fibonacci(lastArgument));
