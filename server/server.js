require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server = require("http").createServer(app)
const authRoutes = require("./routes/authRoutes")
const appRoutes = require("./routes/appRoutes")
const cors = require("cors")
const socket = require("./socket")

socket(server)

app.get("/", (req, res) => {
    res.send("<h2>Welcome to Mern Chat App</h2>")
})
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})
app.use("/api/user", authRoutes)
app.use("/api/app", appRoutes) 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`)
    })
}) 
