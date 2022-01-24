const mongoose = require("mongoose")

const Brand = mongoose.model(process.env.DB_BRAND_MODEL)

getAll = function (req, res) {
    console.log("bikes GETALL invoked")

    const brandId = req.params.brandId;
    if (mongoose.isValidObjectId(brandId)) {
        Brand.findById(brandId).select("bikes").exec(function (err, brand) {
            console.log("bike found");
            if (err) {
                res.status(500).json("not found");
            } else {
                res.status(200).json(brand.bikes);
            }
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Brand id must be valid mongo id" });
    }

}

getOne = function (req, res) {
    console.log("bike GETONE invoked")
    const brandId = req.params.brandId;
    const bikeId = req.params.bikeId;

    if (mongoose.isValidObjectId(brandId) && mongoose.isValidObjectId(bikeId)) {
        Brand.findById(brandId).select("bikes").exec(function (err, brand) {
            console.log("brand not found" + brand);
            if (err) {
                console.log("brand not found");
                res.status(500).json(brand.bikes);
            } else
                res.status(200).json(brand.bikes.id(bikeId));
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Brand id must be valid mongo id" });
    }
}

addOne = function (req, res) {
    const brandId = req.params.brandId;
    if (mongoose.isValidObjectId(brandId)) {
        const response = {
            status: 200,
            message: "brand"
        }
        const updated = {
            model: req.body.model,
            price: req.body.price,
            weight: req.body.weight
        }
        Brand.findByIdAndUpdate(
            brandId,
            { $push: { "bikes": updated } },
            function (err, model) {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(response.status).json(updated);
                }
            }
        )
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Brand id must be valid mongo id" });
    }
}

const remove = function (req, res) {
    const brandId = req.params.brandId;
    const bikeId = req.params.bikeId;
    if (mongoose.isValidObjectId(brandId) && mongoose.isValidObjectId(bikeId)) {
        Brand.findByIdAndUpdate({ _id: brandId },
            {
                $pull: {
                    bikes: { _id: bikeId }
                }
            },
            function (err, deletedBike) {
                const response = { status: 204, message: deletedBike };
                if (err) {
                    console.log("Error while finding team");
                    response.status = 500;
                    response.message = err;
                } else if (!deletedBike) {
                    console.log("Team not found");
                    response.status = 404;
                    response.message = {
                        "message": "Team not found"
                    };
                }
                res.status(response.status).json(response.message);
            })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Id's must be valid mongo id" });
    }
}

const updateFull = function (req, res) {
    const brandId = req.params.brandId;
    const bikeId = req.params.bikeId;
    if (mongoose.isValidObjectId(brandId) && mongoose.isValidObjectId(bikeId)) {
        Brand.findById(brandId, function (err, brand) {
            const response = { status: 201, message: brand };

            if (err) {
                console.log("Error while finding team");
                response.status = 500;
                response.message = err;
            }
            const updated = {
                model: req.body.model,
                price: req.body.price,
                weight: req.body.weight,
            }
            const currentBike = brand.bikes.id(bikeId);
            currentBike.set(updated);
            console.log(currentBike + "currentBike");
            brand.save();

            res.status(response.status).json(currentBike);
        })
    } else {
        console.log("id not valid");
        res.status(400).json({ "message": "Id's must be valid mongo id" });
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    remove,
    updateFull
}