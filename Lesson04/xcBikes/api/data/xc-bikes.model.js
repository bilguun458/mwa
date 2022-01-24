const mongoose = require("mongoose")

const bikeSchema = mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    price: Number,
    weight: {
        type: String,
        "default": 10
    }
})

const brandSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    country: String,
    bikes: [bikeSchema]
})

mongoose.model(process.env.DB_BRAND_MODEL, brandSchema, process.env.DB_BRANDS_COLLECTION);