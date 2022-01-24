const mongoose = require("mongoose")

const Brand = mongoose.model(process.env.DB_BRAND_MODEL)

const getAll = function (req, res) {
    console.log("Brands GETALL invoked")

    let limit = parseInt(process.env.DEFAULT_LIMIT, 10)
    let maxCount = parseInt(process.env.MAX_LIMIT, 10)
    if (req.query && req.query.limit) {
        limit = parseInt(req.query.limit, 10);
    }
    if (maxCount < limit) {
        console.log("count is greater than max limit");
        res.status(400).json({ "message": "count is greater than max limit " + maxCount })
    }
    let query = {};
    if (req.query && req.query.keyword !== "") {
        query = { title: { $regex: req.query.keyword } }
    }

    Brand.find(query).limit(limit).exec(function (err, brands) {
        if (err) {
            console.log("brand found error");
            res.status(500).json(err);
        } else {
            console.log("brands found");
            res.status(200).json(brands);
        }
    })
}

const getOne = function (req, res) { // try to make your methods have one return
    console.log("brands GETONE invoked")
    const brandId = req.params.brandId;

    if (mongoose.isValidObjectId(brandId)) {
        Brand.findById(brandId).exec(function (err, brand) {
            const response = {
                status: 200,
                message: brand
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!brand) {
                response.status = 404;
                response.message = { "message": "Brand id not match" };
            }
            res.status(response.status).json(response.message);
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Brand id must be valid mongo id" });
    }
}

const addOne = function (req, res) {
    const newBrand = {
        title: req.body.title,
        year: req.body.year,
        country: req.body.country,
    }

    Brand.create(newBrand, function (err, brand) {
        const response = {
            status: 201,
            message: brand
        };
        if (err) {
            console.log("error: ", err);
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message)

    });
}

const updateFull = function (req, res) {
    console.log("update full call" + req.body);
    const brandId = req.params.brandId;

    if (mongoose.isValidObjectId(brandId)) {
        Brand.findById(brandId, function (err, brand) {
            const response = { status: 201, message: brand };

            if (err) {
                console.log("Error while finding team");
                response.status = 500;
                response.message = err;
            }
            const updated = {
                title: req.body.title,
                year: req.body.year,
                country: req.body.country,
            }
            brand.set(updated);
            brand.save();

            res.status(response.status).json(updated);
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Brand id must be valid mongo id" });
    }
}

const remove = function (req, res) {
    const brandId = req.params.brandId;
    Brand.findByIdAndDelete(brandId).exec(function (err, deletedBrand) {
        const response = { status: 204, message: deletedBrand };
        if (err) {
            console.log("Error finding brand");
            response.status = 500;
            response.message = err;
        } else if (!deletedBrand) {
            console.log("Brand id not found");
            response.status = 404;
            response.message = {
                "message": "Brand ID not found"
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateFull,
    remove,
}