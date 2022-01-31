const mongoose = require("mongoose");

const Movie = mongoose.model(process.env.DB_MOVIES_MODEL)

const getAll = function (req, res) {
    let limit = 10;
    let maxCount = 100;
    if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }

    if (limit > maxCount) res.status(400).json({ "msg": "limit exceeded!" })

    Movie.find().limit(limit).exec(function (err, movies) {
        console.log("movies found");
        const resp = {
            status: 200,
            msg: movies
        }

        if (err) {
            resp.status = 500
            resp.msg = "Movies not found"
        }

        res.status(resp.status).json(resp.msg)
    })
}

const getOne = function (req, res) {
    const _id = req.params.id;
    if (mongoose.isValidObjectId(_id)) {
        Movie.findById(_id).exec(function (err, movie) {
            console.log("movie found");
            const resp = {
                status: 200,
                msg: movie
            }

            if (err) {
                resp.status = 500
                resp.msg = { "msg": "Movie not found" }
            } else if (!movie) {
                resp.status = 404
                resp.msg = { "msg": "Movie id not match" }
            }

            res.status(resp.status).json(resp.msg)
        })
    } else {
        res.status(400).json({ "msg": "not valid id" })
    }
}

const deleteOne = function (req, res) {
    const _id = req.params.id;
    if (mongoose.isValidObjectId(_id)) {
        Movie.findByIdAndDelete(_id).exec(function (err, movie) {
            console.log("movie delete");
            const resp = {
                status: 204,
                msg: movie
            }

            if (err) {
                resp.status = 500
                resp.msg = { "msg": "Movie not found" }
            } else if (!movie) {
                resp.status = 404
                resp.msg = { "msg": "Movie id not match" }
            }

            res.status(resp.status).json(resp.msg)
        })
    } else {
        res.status(400).json({ "msg": "not valid id" })
    }
}

module.exports = {
    getAll, getOne, deleteOne
}