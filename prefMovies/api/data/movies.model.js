const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title: String,
    poster: String,
    year: Number
})

mongoose.model(process.env.DB_MOVIES_MODEL, movieSchema, process.env.DB_MOVIES_COLLECTION)