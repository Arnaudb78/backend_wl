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
    const body = req.body;
    console.log("req.body --->", body);
    if(body){
        const user = new User({
            name: body.name,
            mail: body.mail,
            password: body.password,
        });
        
        user.save().then((user) => {
            return res.status(201).json({user})
        })
        .catch((error) => {return  res.status(400).json({error})})
    } else {
        console.log('va niquer tes morts');
    }

};
