const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');
/*
    "title":"asdasdasd",
    "lectureName":"asdasdasd",
    "instructorName":"asdasdasd",
    "username":"asdasdasd",
    "url":"asdasdasd",
    "description":"asdasdasd"
*/

// Create a new Note
router.post('/',verifyToken, async (req, res) => {
    const newNote = new Note(req.body);
    try{
        const user = await User.findOne({username:req.body.username})
        const updatedUser = await User.findByIdAndUpdate(user._id,{
        point:user.point+10
    },{new:true})
        const savedNote = await newNote.save();
        return res.status(200).json(updatedUser)
    }catch(err){
        res.status(400).json(err);
    }
})

// Delete a Note
router.delete('/:id', verifyToken, async (req, res) => {
    const note = await Note.findById(req.params.id);
    try{
        
        if(note.username === req.body.username){   
            const user = await User.findOne({username:req.body.username})
            const updatedUser = await User.findByIdAndUpdate(user._id,{
            point:user.point-10
            },{new:true}) 
            try{
                await note.delete();
                res.status(200).json(updatedUser)
            }catch(err){
                res.status(400).json(err)
            }
        }else{
            res.status(400).json("You can delete only your note !")
        }
    }catch(err){
        res.status(400).json(err);
    }
})

// Update a Post
router.put('/:id', verifyToken, async (req, res) => {
    const note = await Note.findById(req.params.id);
        try{
            const updatedNote = await Note.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
            return res.status(200).json(updatedNote)
        }catch(err){
            return res.status(400).json(err)
        }
})

// Get a single Note
router.get('/:id', verifyToken, async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note){
       return res.status(200).json(note);
    }else{
        return res.status(400).json("error")
    }
})

// Get ALL Notes
router.get('/', verifyToken, async (req, res) => {
    const notes = await Note.find({}).sort({createdAt:-1}) 
    if(notes){
        return res.status(200).json(notes)
    }else{
        return res.status(400).json("error")
    }
})






module.exports = router