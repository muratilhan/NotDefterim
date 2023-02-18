const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");



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




module.exports = router