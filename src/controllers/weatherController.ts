import { Request, Response } from "express";
import Weather from "../models/weatherModel";
import User from "../models/userModel";
import axios, { AxiosResponse } from "axios";

const NEW_ENTRY_THROTTLE = 1800000; // 30 minutes in milliseconds

const saveLoc = async (req: Request, res: Response) => {
    try {
        const { lat, lon, email } = req.body;
        if (!lat || !lon || !email) throw new Error("Missing parameters");

        const user = await User.findOne({ mail: email });
        const userId = user?._id;

        const weather = await Weather.findOne({ lat: lat, lon: lon });

        if (weather?.date) {
            const weatherDate = Date.parse(weather.date);
            const dateNow = new Date().getTime();

            if (dateNow < weatherDate + NEW_ENTRY_THROTTLE) {
                console.log("Request throttled");
                return res.status(200).json(weather);
            }
        }

        const apiKey = process.env.OP_API_KEY;
        if (!apiKey) throw new Error("Missing API key");

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
        const response = await axios.post(apiUrl);

        const weatherResponse: AxiosResponse = response;
        const weatherObject = weatherResponse.data;

        const newWeather = new Weather({
            user: userId,
            lat: lat,
            lon: lon,
            city: weatherObject["name"],
            date: new Date().toISOString(),
            desc: weatherObject["weather"][0]["description"],
            temp: weatherObject["main"]["temp"],
            temp_min: weatherObject["main"]["temp_min"],
            temp_max: weatherObject["main"]["temp_max"],
            humidity: weatherObject["main"]["humidity"],
        });

        await newWeather.save();
        res.status(201).json(newWeather);
    } catch (error: any) {
        console.log("Request error -->", error.message);
    }
};

const weatherHistory = async (req: Request, res: Response) => {
    const { email } = req.query;
    if (!email) throw new Error("Missing parameters");

    const user = await User.findOne({ mail: email });
    const userId = user?._id;

    if (!user) throw new Error("User not found");

    const data = await Weather.find({ user: userId });
    if (!data) throw new Error("No data found");
    res.status(200).json(
        data.map((d) => ({
            city: d.city,
            date: d.date,
            desc: d.desc,
            temp: d.temp,
            temp_min: d.temp_min,
            temp_max: d.temp_max,
            humidity: d.humidity,
        }))
    );
};

export { saveLoc, weatherHistory };
