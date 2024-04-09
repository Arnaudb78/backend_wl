import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lat: Number,
    lon: Number,
    city: String,
    date: Number,
    desc: String,
    temp: Number,
    temp_min: Number,
    temp_max: Number,
    humidity: Number,
});

export default mongoose.model("weatherData", weatherDataSchema);
