const gamesData = require("../data/games.json")

module.exports.getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    res.status(200).json(gamesData)
}
