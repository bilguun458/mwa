const mongoose = require("mongoose")

const Game = mongoose.model(process.env.DB_GAME_MODEL)

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const point = { type: "Point", coordinates: [lng, lat] }
    const query = {
        "publisher.location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: parseFloat(process.env.GEO_SEARCHING_MAX_DISTANCE, 10),
                $minDistance: parseFloat(process.env.GEO_SEARCHING_MIN_DISTANCE, 10)
            }
        }
    };
    Game.find(query).limit(parseInt(process.env.DEFAULT_LIMIT, 10)).exec(function (err, games) {
        if (err) {
            console.log("Games found error: ", err);
            res.status(500).json(err);
        } else {
            console.log("Games found latitude");
            res.status(200).json(games);

        }
    })
}

const getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res);
        return;
    }

    let limit = parseInt(process.env.DEFAULT_LIMIT, 10)
    let maxCount = parseInt(process.env.MAX_LIMIT, 10)
    if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit, 10);
    }
    if (maxCount < limit) {
        console.log("count is greater than max limit");
        res.status(400).json({ "message": "count is greater than max limit " + maxCount })
    }

    Game.find().sort({ title: -1 }).limit(limit).exec(function (err, games) {
        if (err) {
            console.log("Games found error");
            res.status(500).json(err);
        } else {
            console.log("games found");
            res.status(200).json(games);
        }
    })
}

const getOne = function (req, res) { // try to make your methods have one return
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

const addOne = function (req, res) {
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

const remove = function (req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
        const response = { status: 204, message: deletedGame };
        if (err) {
            console.log("Error finding brand");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            console.log("Brand id not found");
            response.status = 404;
            response.message = {
                "message": "Brand ID not found"
            };
        }
        res.status(response.status).json(response.message);
    });
}

const updateOne = function (req, res, callback) {
    const gameId = req.params.gameId;

    if (mongoose.isValidObjectId(gameId)) {
        Game.findById(gameId).exec(function (err, game) {
            const response = {
                status: 204,
                message: game
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!game) {
                response.status = 404;
                response.message = { "message": "Game id not match" };
            }

            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                callback(req, res, game, response);
            }
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Game id must be valid id" });
    }
}

const fullUpdateOne = function (req, res) {
    const gameUpdate = function (req, res, game, response) {
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = req.body.price;
        game.minPlayers = req.body.minPlayers;
        game.maxPlayers = req.body.maxPlayers;
        game.minAge = req.body.minAge;
        game.designers = [req.body.designer];
        if (req.body.name)
            game.publisher = { name: req.body.name };
        else
            game.publisher = { name: "noname" };
        game.reviews = []

        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500;
                response.status = err
            }
            response.message = updatedGame;
            res.status(response.status).json(response.updatedGame);
        })
    }
    updateOne(req, res, gameUpdate)
}

const partialUpdateOne = function (req, res) {
    const gameUpdate = function (req, res, game, response) {
        if (req.body.title) { game.title = req.body.title; }
        if (req.body.year) { game.year = req.body.year; }
        if (req.body.rate) { game.rate = req.body.rate; }
        if (req.body.price) { game.price = req.body.price; }
        if (req.body.minPlayers) { game.minPlayers = req.body.minPlayers; }
        if (req.body.maxPlayers) { game.maxPlayers = req.body.maxPlayers; }
        if (req.body.minAge) { game.minAge = req.body.minAge; }
        if (req.body.designer) { game.designers = [req.body.designer]; }
        if (req.body.name) { game.publisher = { name: req.body.name }; }
        else { game.publisher = { name: "noname" }; }
        game.reviews = []

        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500;
                response.status = err
            }
            response.message = updatedGame;
            res.status(response.status).json(response.updatedGame);
        })
    }
    updateOne(req, res, gameUpdate)
}

module.exports = {
    getAll,
    getOne,
    addOne,
    remove,
    fullUpdateOne,
    partialUpdateOne,
}