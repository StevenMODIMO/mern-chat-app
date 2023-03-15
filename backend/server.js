require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server = require("http").createServer(app)

app.get("/", (req, res) => {
    res.send("<h2>Welcome to Mern Chat App</h2>")
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`)
    })
})