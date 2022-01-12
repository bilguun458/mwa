const gamesData = require("../data/games.json")

module.exports.getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    res.status(200).json(gamesData)
}

module.exports.getOne = function (req, res) {
    console.log("GAMES GETONE invoked")
    const gameId = req.params.gameId;
    const game = gamesData[gameId];
    res.status(200).json(game)
}
