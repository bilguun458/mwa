const mongoose = require("mongoose")

const jobsSchema = mongoose.Schema({
    title: String,
    salary: Number,
    location: {
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    description: String,
    experience: String,
    skills: [String],
    postDate: {
        type: Date,
        "default": Date.now
    }
})

mongoose.model(process.env.DB_JOB_MODEL, jobsSchema, process.env.DB_GAMES_COLLECTION)