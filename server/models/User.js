const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nameLastname:{
        type:String,
        required:true,
        minlength:5
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
        
    },
    photo:{
        type:String,
        default:""
    },
    point:{
        type:Number,
        default:0
    }
}, { timestamps: true })

module.exports = mongoose.model('User',userSchema)