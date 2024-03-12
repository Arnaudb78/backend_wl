const Open = require("../models/weatherModel");

exports.saveLoc = (req, res) => {
    const body = req.body;
    if (body) {
        const open = new Open({
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
