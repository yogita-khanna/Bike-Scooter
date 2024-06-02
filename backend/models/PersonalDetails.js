const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true,
    },
    adharcard:{
        type:String,
        required:true,
    },
    pancard:{
        type:String,
        required:true,
    },
    drivinglicence:{
        type:String,
        required:true,
    },
    days:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model("Personal Details", personalDetailsSchema);