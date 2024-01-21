require("dotenv").config()
require("./models/connection")
const express = require('express')
const bodyParser = require('body-parser')
const users = require("./routes/userRoute")

const app = express()
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.status(200).send("Backend online")
})

app.use("/user", users);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server online !')
})

module.exports = app;