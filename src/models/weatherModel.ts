import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema({
    lat: Number,
    lon: Number,
    city: String,
    date: String,
    desc: String,
    temp: Number,
    temp_min: Number,
    temp_max: Number,
    humidity: Number,
});

export default mongoose.model("weatherData", weatherDataSchema);
