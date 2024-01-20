require("dotenv").config()
require("./models/connection")
const express = require('express')
const users = require("./routes/userRoute")

const port = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) =>{
    res.status(200).send("Backend check")
})

app.use("/user", users)

app.listen(port, () => {
    console.log('Server online !')
})