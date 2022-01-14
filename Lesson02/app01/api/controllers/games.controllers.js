const { ObjectId } = require("mongodb");
// const gamesData = require("../data/games.json")
const dbConnection = require("../data/dbConnection")

getAll = function (req, res) {
    console.log("GAMES GETALL invoked")
    let offset = 0
    let count = 5;
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count) count = parseInt(req.query.count);
    // console.log("offset + count: " + offset + count);
    // const pageGames = gamesData.slice(offset, offset + count)

    const db = dbConnection.get();
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)
    gamesCollection.find().skip(offset).limit(count).toArray(function (err, games) {
        console.log("found games");
        res.status(200).json(games)
    })
}

getOne = function (req, res) {
    console.log("GAMES GETONE invoked")
    // const gameId = req.params.gameId;
    // const game = gamesData[gameId];
    // res.status(200).json(game)
    const db = dbConnection.get()
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)
    gamesCollection.findOne({ _id: ObjectId(gameId) }, function (err, games) {
        console.log("found one");
        res.status(200).json(games)
    })
}

addOne = function (req, res) {
    // console.log("GAMES ADDONE invoked")
    // console.log(req.body)

    // res.status(200).json(req.body)
    const db = dbConnection.get()
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION)

    if (req.body && req.body.title && req.body.price) {
        console.log("Body " + req.body);
        const newGame = {
            title: req.body.title,
            price: parseFloat(req.body.price)
        }
        gamesCollection.insertOne(newGame, function (err, games) {
            console.log("insert one");
            res.status(200).json(req.body)
        })
    } else {
        console.log("Missing data body ");
        res.status(400).json({ error: "Data missing POST body" })
    }
}

module.exports = {
    getAll,
    getOne,
    addOne
}