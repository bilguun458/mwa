const gamesData = require("../data/games.json")

module.exports.getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    let offset = 0
    let count = 5;
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count) count = parseInt(req.query.count);
    console.log("offset + count: " + offset + count);
    const pageGames = gamesData.slice(offset, offset + count)
    res.status(200).json(pageGames)
}

module.exports.getOne = function (req, res) {
    console.log("GAMES GETONE invoked")
    const gameId = req.params.gameId;
    const game = gamesData[gameId];
    res.status(200).json(game)
}
