require("dotenv").config();
require("./config/connection");
const express = require("express");
const users = require("./routes/userRoute");
const open = require("./routes/apiOpenRoute");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Backend online");
});

app.use("/user", users);
app.use("/api", open);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server online !");
});

module.exports = app;
