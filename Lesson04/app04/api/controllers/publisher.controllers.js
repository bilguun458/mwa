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

function _addPublisher(req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.publisher.established = req.body.established;
    game.publisher.location.coordinates = [parseFloat(req.body.lng, 10), parseFloat(req.body.lat, 10)];
    game.save(function (err, updatedGame) {
        const response = {
            status: 201,
            message: updatedGame
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}

addOne = function (req, res) {
    const gameId = req.params.gameId;
    if (mongoose.isValidObjectId(gameId)) {
        Game.findById(gameId).select('publisher').exec(function (err, game) {
            const response = {
                status: 201,
                message: game
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!game) {
                response.status = 404;
                response.message = { "message": "Game id not found" };
            }
            if (response.status === 201) {
                _addPublisher(req, res, game);
            } else {
                res.status(response.status).json(response.message);
            }
        });
    };
}

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
    addOne,
    // remove,
}