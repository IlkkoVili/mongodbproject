const mongoose = require("mongoose")

// Define movie schema and model
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    runtime: {
        type: Number,
    },
    year: {
        type: Number,
    }
})

module.exports = mongoose.model("Movie", movieSchema)