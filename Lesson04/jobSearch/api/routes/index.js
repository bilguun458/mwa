const express = require("express")
const router = express.Router()
const jobsController = require("../controllers/jobs.controllers")

router.route("/jobs")
    .get(jobsController.getAll)
    .post(jobsController.addOne)

router.route("/jobs/:jobId")
    .get(jobsController.getOne)
    .delete(jobsController.deleteOne)
    .put(jobsController.updateFull)
    .patch(jobsController.updatePartial)

module.exports = router;