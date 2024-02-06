require("dotenv").config();
require("./config/connection");
const express = require("express");
const cors = require('cors');
const users = require("./routes/userRoute");
const api = require("./routes/apiOpenRoute");

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Backend online");
});

app.use("/user", users);
app.use("/api", api);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server online !");
});

module.exports = app;
