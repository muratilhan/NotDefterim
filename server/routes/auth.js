const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");


// Register
router.post('/register', async (req, res) => {
    try{
        hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            nameLastname: req.body.nameLastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.status(400).json(err);
    }
})

// Login
router.post('/login', async (req, res) => {
    try{    
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json("wrong")
        }
        const validate = await bcrypt.compare(req.body.password,user.password);
        if(!validate){
            return res.status(400).json("wrong")
        }
        const accessToken = jwt.sign(
            {
              id: user._id,
            },
            "accessToken",
            {expiresIn:"30d"}
          );
          const { password, ...others } = user._doc;
          
        return res.status(200).json({user, accessToken})

    }catch(err){
        return res.status(200).json("yanlış")
    }
})

router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
})


router.get('/users', async (req, res) => {
    const users = await User.find({}).sort({createdAt:-1}) 
    res.status(200).json(users)
})

router.get('/users/topfive', async (req, res) => {
    const users = await User.find({})
    users.sort(function(a, b){return a.point - b.point})
    const topUsers = users.slice(-3);
    res.status(200).json(topUsers)
})



module.exports = router