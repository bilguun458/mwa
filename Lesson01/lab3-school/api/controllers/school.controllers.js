const schoolData = require("../data/school.json")

getAll = function (req, res) {
    console.log("STUDENTS GETALL invoked")

    res.status(200).json(schoolData)
}

getOne = function (req, res) {
    console.log("STUDENTS GETONE invoked")
    const id = req.params.id;
    const stud = schoolData[id];
    res.status(200).json(stud)
}

module.exports = {
    getAll,
    getOne
}