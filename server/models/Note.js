const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    lectureName:{
        type:String,
        required:true,
    },
    instructorName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Note',noteSchema)