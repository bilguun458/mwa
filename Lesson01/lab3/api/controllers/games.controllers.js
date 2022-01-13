const gamesData = require("../data/games.json")

getAll = function (req, res) {
    console.log("GAMES GETALL invoked")

    res.status(200).json(gamesData)
}

module.exports = {
    getAll
}