import { Request, Response } from "express";
import Weather from "../models/weatherModel";
import axios, { AxiosResponse } from "axios";

const saveLoc = async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.body;
        if (!lat || !lon) throw new Error("Missing parameters");
        const apiKey = process.env.OP_API_KEY;
        if (!apiKey) throw new Error("Missing API key");

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;
        const response = await axios.post(apiUrl);
        const weatherResponse: AxiosResponse = response;
        const weatherObject = weatherResponse.data;

        const newWeather = new Weather({
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

export { saveLoc };
