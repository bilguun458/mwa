const { ObjectId } = require("mongodb");
const dbConnection = require("../data/dbConnection")
const mongoose = require("mongoose")

const Game = mongoose.model(process.env.DB_GAME_MODEL)

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const point = { type: "Point", coordinates: { lng, lat } }
    const query = {
        "publisher.location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: parseFloat(process.env.GEO_SEARCHING_MAX_DISTANCE, 10),
                $minDistance: parseFloat(process.env.GEO_SEARCHING_MIN_DISTANCE, 10)
            }
        }
    }
    Game.find(query).limit(parseInt(process.env.DEFAULT_LIMIT, 10)).exec(function (err, games) {
        if (err) {
            console.log("Games found error");
            res.status(500).json(err);
        } else {
            console.log("Games found latitude");
            res.status(200).json(games);

        }
    })
}

getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    if (req.query && req.query.lat && req.query.lng) _runGeoQuery(req, res);

    let limit = parseInt(process.env.DEFAULT_LIMIT, 10)
    let maxCount = parseInt(process.env.MAX_LIMIT, 10)
    if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit, 10);
    }
    if (maxCount < limit) {
        console.log("count is greater than max limit");
        res.status(400).json({ "message": "count is greater than max limit " + maxCount })
    }

    Game.find().limit(limit).exec(function (err, games) {
        if (err) {
            console.log("Games found error");
            res.status(500).json(err);
        } else {
            console.log("games found");
            res.status(200).json(games);
        }
    })
}

getOne = function (req, res) {
    console.log("GAMES GETONE invoked")
    const gameId = req.params.gameId;

    Game.findById(gameId).exec(function (err, game) {
        console.log("GETONE game found");
        res.status(200).json(game);
    })
}

addOne = function (req, res) {
    const db = dbConnection.get()
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        console.log("Body " + req.body);
        const newGame = {
            title: req.body.title,
            price: parseFloat(req.body.price),
            minPlayers: parseInt(req.body.minPlayers, 10),
            minAge: parseInt(req.body.minAge, 10)
        }
        gamesCollection.insertOne(newGame, function (err, game) {
            console.log("insert one");
            res.status(201).json(game)
        })
    } else {
        console.log("Missing data body ");
        res.status(400).json({ error: "Data missing POST body" })
    }
}

remove = function (req, res) {
    const db = dbConnection.get()
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

    let gameId = req.params.gameId;
    gamesCollection.deleteOne({ _id: ObjectId(gameId) }, function (err, games) {
        console.log("delete one");
        res.status(200).json({ "message": "delete success" })
    })
}

module.exports = {
    getAll,
    getOne,
    addOne,
    remove,
}