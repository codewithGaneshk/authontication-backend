const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
module.exports=mongoose.model("myuser",userSchema)