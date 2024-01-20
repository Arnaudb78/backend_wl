const User = require("../models/userModel");

exports.getUser = (req, res) => {
    res.status(200).json({message: "get user"})};

exports.getIdUser =  (req, res) =>{
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
};

exports.postUser = (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    user.save().then((user) => {
        return res.status(201).json({user})
    })
    .catch((error) => {return  res.status(400).json({error})})
};
