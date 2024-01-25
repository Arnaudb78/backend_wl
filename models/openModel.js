const mongoose = require("mongoose");

const openSchema = mongoose.Schema({
    lat: Number,
    lon: Number,
    date: String,
});

module.exports = mongoose.model("openWeather", openSchema);
