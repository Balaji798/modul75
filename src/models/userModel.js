const userModel=require("../models/userModal")
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:{
        type:String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: {type: String,enum: ['male','female','LGBTQ',others]},// femail will give error
    age:Number,
   // isIndian: Boolean,
   // parentsInfo:{motherName:String,fatherName:String,},
   // cars:[string]

},{timestamps:true})
module.exports=mongoose.model("user",userSchema)

//module.exports=