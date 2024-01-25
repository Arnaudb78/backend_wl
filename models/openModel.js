const mongoose = require("mongoose");

const openSchema = mongoose.Schema({});

module.exports = mongoose.model("openWeather", openSchema);
