const express = require("express")
const router = express.Router()
const User = require("../models/users");

router.get("/", (req, res) => {
    res.status(200).json({message: "tous les utilisateurs"})
})

router.get("/:id", (req, res) =>{
    const id = req.params.id;
    res.status(200).json({
        id: id
    });
})

router.post("/insertUser", (req, res) => {
    const { name, email, password } = req.body; // Utilisez req.body pour récupérer les données du corps
    console.log(req.body)
    const newUser = new User({
        name: name,
        email: email,
        password: password,
    });

    newUser.save().then(userData => {
        res.json({ result: true, user: userData });
    }).catch(error => {
        console.error("Error saving user:", error);
        res.json({ result: false, error: error.message });
    });
});


module.exports = router;