require("dotenv").config()
require("./models/connection")
const express = require('express')
const port = process.env.PORT || 5000


const app = express()

app.get('/', (req, res) =>{
    res.status(200).send("Backend check")
})


const users = require("./routes/users")
app.use("/users", users)

app.listen(port, () => {
    console.log('Server online !')
})