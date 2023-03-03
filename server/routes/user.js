const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require('./verifyToken');
const Note = require('../models/Note');



router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
})


router.get('/users', async (req, res) => {
    const users = await User.find({}).sort({createdAt:-1}) 
    res.status(200).json(users)
})

router.get('/topthree', async (req, res) => {
    const users = await User.find({})
    users.sort(function(a, b){return a.point - b.point})
    const topUsers = users.slice(-3);
    res.status(200).json(topUsers)
})

router.put('/:id', verifyToken,  async (req, res) => {
    try{
        hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = await User.findById(req.params.id)
        const updatedNote = await Note.updateMany({username: user.username},{
            $set:{
                username:req.body.username
            }
        },{ new: true })  
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            nameLastname: req.body.nameLastname,
            username: req.body.username,
            password: hashedPassword,
            email:user.email
        }
    },{ new: true })
       
    return res.status(200).json(updatedUser)
    }catch(err){
        return res.status(400).json(err)
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        try{
            await user.delete();
            res.status(200).json(user)
        }catch(err){
            res.status(400).json(err)
        }
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router