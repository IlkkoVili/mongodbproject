require("dotenv").config()

// Required packages
const express = require("express")
const app = express()
const mongoose = require("mongoose")


// Connect to database with mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to database"))

app.use(express.json())

const moviesRouter = require("./routes/movies")
app.use("/movies", moviesRouter)

app.listen(3000, () => console.log("Server started, port 3000"))
