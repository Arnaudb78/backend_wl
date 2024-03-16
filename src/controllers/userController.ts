import { Request, Response } from "express";
import User from "../models/userModel";

const getUser = (req: Request, res: Response) => {
    User.find().then((dataUser) => {
        res.json({ users: dataUser });
    });
};

const getUserByEmail = (req: Request, res: Response) => {
    console.log(req.params.email);
    User.findOne({ email: req.params.email }).then((emailUser) => {
        if (!emailUser) res.json({ result: false, error: "Pas de user sur cet email" });
        
        res.json({ result: true, email: emailUser });
    });
};

const createUser = (req: Request, res: Response) => {
    const body = req.body;
    if(!body) throw new Error("No body found in request.");
    if(body.email_verified === false) return false;
   
        const user = new User({
            name: body.name,
            mail: body.email,
        });

        user.save()
            .then((user) => {
                return res.status(201).json({ user });
            })
            .catch((error) => {
                return res.status(400).json({ error });
            });
};

export { getUser, getUserByEmail, createUser };
