const mongoose = require("mongoose")

const Job = mongoose.model(process.env.DB_JOB_MODEL)

const _runGeoquery = function (req, res) {
    const lat = parseFloat(req.body.lat, 10)
    const lng = parseFloat(req.body.lng, 10)

    const point = {
        type: "Point",
        coordinates: [lng, lat]
    }
    const query = {
        "location.coordinates": point,
        $near: {
            $geometry: point,
            $minDistance: parseFloat(process.env.GEO_SEARCHING_MIN_DISTANCE, 10),
            $maxDistance: parseFloat(process.env.GEO_SEARCHING_MAX_DISTANCE, 10)
        }
    }
}

const getAll = function (req, res) {
    if (req.query.lat && req.query.lng) {
        _runGeoquery(req, res)
        return;
    }

    let limit = parseInt(process.env.DEFAULT_LIMIT, 10)
    let maxCount = parseInt(process.env.MAX_LIMIT, 10)
    if (req.query && req.query.limit) {
        limit = req.query.limit;
    }
    if (maxCount < limit) {
        res.status(400).json("limit exceeded !");
    }

    Job.find().limit(limit).exec(function (err, jobs) {
        console.log("jobs: ", jobs);
        let response = {
            status: 200,
            message: jobs
        }
        if (err) {
            response.status = 500;
            respponse.message = "not found"
        } else {
            res.status(response.status).json(response.message)
        }
    })
}

const getOne = function (req, res) {
    const jobId = req.params.jobId;

    if (mongoose.isValidObjectId(jobId)) {
        Job.findById(jobId).exec(function (err, job) {
            let response = {
                status: 200,
                message: job
            };
            if (err) {
                response.status = 500;
                response.message = "not found job"
            } else if (!job) {
                response.status = 404;
                response.message = { "message": "Job id not match" };
            }
            res.status(response.status).json(response.message);
        })
    }
    else {
        res.status(400).json("not valid id")
    }
}

const addOne = function (req, res) {
    const newJob = {
        title: req.body.title,
        description: req.body.description,
        salary: parseFloat(req.body.salary, 10),
        experience: req.body.experience,
        skills: req.body.skills,
        postDate: req.body.postDate,
        location: { coordinates: [parseFloat(req.body.lat, 10), parseFloat(req.body.lng, 10)] }
    }

    Job.create(newJob, function (err, job) {
        response = { status: 201, message: job }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(200).json(response.message)
    })
}

const deleteOne = function (req, res) {
    const jobId = req.params.jobId

    if (mongoose.isValidObjectId(jobId)) {
        Job.findByIdAndDelete(jobId, function (err, deletedJob) {
            response = { status: 204, message: deletedJob }
            if (err) {
                response.status = 500;
                response.message = "{'message': 'error on delete'}"
            }
            res.status(response.status).json(response.message);
        })
    } else {
        res.status(400).json({ "message": "Id must be valid mongo id" })
    }
}

const updateFull = function (req, res) {
    const updateCallback = function (req, res, job, response) {
        if (!req.body) res.status("400").json("need params")
        job.title = req.body.title;
        job.description = req.body.description;
        job.salary = parseFloat(req.body.salary, 10);
        job.experience = req.body.experience;
        job.skills = req.body.skills;
        job.postDate = req.body.postDate;

        if (req.body.lat && req.body.lng) {
            job.location = { coordinates: [parseFloat(req.body.lat, 10), parseFloat(req.body.lng, 10)] }
        }

        job.save(function (err, updatedJob) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            response.message = updatedJob;
            res.status(response.status).json(response.message);
        })
    }
    update(req, res, updateCallback);
}

const updatePartial = function (req, res) {
    const updateCallback = function (req, res, job, response) {
        if (!req.body) res.status("400").json("need params")
        if (req.body.title) { job.title = req.body.title }
        if (req.body.description) { job.description = req.body.description }
        if (req.body.salary) { job.salary = parseFloat(req.body.salary, 10) }
        if (req.body.experience) { job.experience = req.body.experience }
        if (req.body.skills) { job.skills = req.body.skills }
        if (req.body.postDate) { job.postDate = req.body.postDate }

        if (req.body.lat && req.body.lng) {
            job.location = { coordinates: [parseFloat(req.body.lat, 10), parseFloat(req.body.lng, 10)] }
        }

        job.save(function (err, updatedJob) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            response.message = updatedJob;
            res.status(response.status).json(response.message);
        })
    }
    update(req, res, updateCallback);
}

const update = function (req, res, callback) {
    const jobId = req.params.jobId

    if (mongoose.isValidObjectId(jobId)) {
        const job = Job.findById(jobId, function (err, job) {
            const response = {
                status: 204,
                message: job
            }

            if (err) {
                response.status = 500;
                response.message = "error"
            } else if (!job) {
                response.status = 400;
                response.message = "Job not found"
            }

            if (response.status === 204) callback(req, res, job, response);
            else res.status(response.status).json(response.message)
        })
    } else {
        res.status(400).json("{'message': 'Id must be valid mongo id'}")
    }
}

module.exports = {
    getAll, getOne, addOne, deleteOne, updateFull, updatePartial
}