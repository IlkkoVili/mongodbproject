// Required packages
const express= require("express")
const router = express.Router()
const Movie = require("../models/movie")


// Getting all movies
router.get("/", async (req, res) => {
try {
    const movies = await Movie.find().limit(10)
    res.json(movies)
} catch (err) {
    res.status(500).json({ message: err.message })
}
})

// Getting One movie
router.get("/:id", getMovie, (req, res) => {
    res.json(res.movie)
})

// Creating One movie
router.post("/", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        runtime: req.body.runtime,
        year: req.body.year
    })
    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one movie
router.patch("/:id", getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title
    }
    if (req.body.year != null) {
        res.movie.year = req.body.year
    }
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one movie
router.delete("/:id", getMovie, async (req, res) => {
try {
    await res.movie.deleteOne()
    res.json({ message: "Deleted a movie" })
} catch (err) {
    res.status(500).json({ message: err.message })
}
})

async function getMovie(req, res, next) {
    let movie
    try {
        movie = await Movie.findById(req.params.id)
        if (movie == null) {
            return res.status(404).json({ message: "Cannot find movie" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.movie = movie
    next()
}

module.exports = router