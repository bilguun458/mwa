const mongoose = require("mongoose")

const Game = mongoose.model(process.env.DB_GAME_MODEL)

// getAll = function (req, res) {
//     console.log("GAMES GETALL invoked")
//     let limit = 6;
//     if (req.query && req.query.limit && parseInt(req.query.limit) <= 9) limit = parseInt(req.query.limit);

//     Game.find().limit(limit).exec(function (err, games) {
//         console.log("games found");
//         res.status(200).json(games);
//     })
// }

getOne = function (req, res) {
    console.log("publisher GETONE invoked")
    gameId = req.params.gameId;

    Game.findById(gameId).select("publisher").exec(function (err, game) {
        console.log("game found");
        res.status(200).json(game.publisher);
    })
}

// addOne = function (req, res) {
//     const db = dbConnection.get()
//     const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

//     if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
//         console.log("Body " + req.body);
//         const newGame = {
//             title: req.body.title,
//             price: parseFloat(req.body.price),
//             minPlayers: parseInt(req.body.minPlayers, 10),
//             minAge: parseInt(req.body.minAge, 10)
//         }
//         gamesCollection.insertOne(newGame, function (err, game) {
//             console.log("insert one");
//             res.status(201).json(game)
//         })
//     } else {
//         console.log("Missing data body ");
//         res.status(400).json({ error: "Data missing POST body" })
//     }
// }

// remove = function (req, res) {
//     const db = dbConnection.get()
//     const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

//     let gameId = req.params.gameId;
//     gamesCollection.deleteOne({ _id: ObjectId(gameId) }, function (err, games) {
//         console.log("delete one");
//         res.status(200).json({ "message": "delete success" })
//     })
// }

module.exports = {
    // getAll,
    getOne,
    // addOne,
    // remove,
}