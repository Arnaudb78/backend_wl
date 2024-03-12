import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema({
    lat: Number,
    lon: Number,
    date: String,
});

export default mongoose.model("weatherData", weatherDataSchema);
