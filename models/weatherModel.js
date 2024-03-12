const mongoose = require("mongoose");

const weatherDataSchema = mongoose.Schema({
    lat: Number,
    lon: Number,
    date: String,
});

module.exports = mongoose.model("weatherData", weatherDataSchema);
