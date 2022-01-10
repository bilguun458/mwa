const fibonacci = function (num) {
    let number = Math.abs(num)
    if (number <= 2) return 1;
    else return fibonacci(number - 1) + fibonacci(number - 2);
}

module.exports = {
    fibonacci
}
