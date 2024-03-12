import { Request, Response } from "express";
import Weather from "../models/weatherModel";

const saveLoc = (req: Request, res: Response) => {
    const body = req.body;
    if (body) {
        const open = new Weather({
            lat: body.lat,
            lon: body.lon,
            date: body.date,
        });

        open.save()
            .then((open) => {
                return res.status(201).json({ open });
            })
            .catch((error) => {
                return res.status(400).json({ error });
            });
    } else {
        console.log("Erreur lors de la requête POST/OPEN");
    }
};

export { saveLoc };
