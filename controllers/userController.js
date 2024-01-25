const User = require("../models/userModel");

exports.getUser = (req, res) => {
    User.find().then((dataUser) => {
        res.json({ users: dataUser });
    });
};

exports.getIdUser = (req, res) => {
    console.log(req.params.id);
    User.findOne({ _id: req.params.id }).then((idUser) => {
        if (idUser) {
            res.json({ result: true, id_user: idUser });
        } else {
            res.json({ result: false, error: "Pas de user sur cet id" });
        }
    });
};

exports.postUser = (req, res) => {
    const body = req.body;
    // console.log(body);
    if (body) {
        const user = new User({
            name: body.name,
            mail: body.mail,
            password: body.password,
        });

        user.save()
            .then((user) => {
                return res.status(201).json({ user });
            })
            .catch((error) => {
                return res.status(400).json({ error });
            });
    } else {
        console.log("Erreur lors de la requête POST/USER");
    }
};
