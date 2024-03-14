import { Request, Response } from "express";
import User from "../models/userModel";

const getUser = (req: Request, res: Response) => {
    User.find().then((dataUser) => {
        res.json({ users: dataUser });
    });
};

const getUserById = (req: Request, res: Response) => {
    User.findOne({ _id: req.params.id }).then((idUser) => {
        if (idUser) {
            res.json({ result: true, id_user: idUser });
        } else {
            res.json({ result: false, error: "Pas de user sur cet id" });
        }
    });
};

const createUser = (req: Request, res: Response) => {
    const body = req.body;
    if (body) {
        const user = new User({
            name: body.name,
            mail: body.mail,
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

export { getUser, getUserById, createUser };
