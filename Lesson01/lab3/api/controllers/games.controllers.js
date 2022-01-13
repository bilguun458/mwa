const gamesData = require("../data/games.json")

getAll = function (req, res) {
    console.log("GAMES GETALL invoked")

    res.status(200).json(gamesData)
}

getOne = function (req, res) {
    console.log("GAMES GETONE invoked")
    const gameId = req.params.gameId;
    const game = gamesData[gameId];
    res.status(200).json(game)
}

addOne = function (req, res) {
    console.log("GAMES ADDONE invoked")
    console.log(req.body)

    res.status(200).json(req.body)
}

module.exports = {
    getAll,
    getOne,
    addOne
}