
multiply = function (req, res) {
    console.log("multiply invoked")

    let num1 = 0
    let num2 = parseInt(req.params.number, 10);
    if (req.query && req.query.number) num1 = parseInt(req.query.number, 10);
    if (req.params && req.params.number) num2 = parseInt(req.params.number, 10);

    res.status(200).json({ "result": num1 * num2 })
}

module.exports = {
    multiply
}