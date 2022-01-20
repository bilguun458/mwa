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

getOne = function (req, res) { // try to make your methods have one return
    console.log("GAMES GETONE invoked")
    const gameId = req.params.gameId;

    if (mongoose.isValidObjectId(gameId)) {
        Game.findById(gameId).exec(function (err, game) {
            const response = {
                status: 200,
                message: game
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!game) {
                response.status = 404;
                response.message = { "message": "Game id not match" };
            }
            res.status(response.status).json(response.message);
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Game id must be valid id" });
    }
}

addOne = function (req, res) {
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate,
        price: req.body.price,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        minAge: req.body.minAge,
        designers: [req.body.designer],
        publisher: { name: "noname" },
        reviews: []
    }

    Game.create(newGame, function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            console.log("error: ", err);
            response.status = 500;
            response.message = err;
        } else {
            console.log("success");
            res.status(response.status).json(response.message)
        }
    });
}

remove = function (req, res) {
    // const db = dbConnection.get()
    // const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

    // let gameId = req.params.gameId;
    // gamesCollection.deleteOne({ _id: ObjectId(gameId) }, function (err, games) {
    //     console.log("delete one");
    //     res.status(200).json({ "message": "delete success" })
    // })
}

module.exports = {
    getAll,
    getOne,
    addOne,
    remove,
}