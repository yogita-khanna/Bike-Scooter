const mongoose = require('mongoose');

const billGenerationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    renewableDate:{
        type:String,
        required:true,
    },
    bikeType:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    vehicleName:{
        type:String,
        required:true,
    },
    dropLocation:{
        type:String,
        required:true,
    },
    advancePayment:{
        type:Number,
        required:true,
    },
    dateOfRenting:{
        type:String,
        required:true,
    },
    numberOfDays:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model("Bill Generation", billGenerationSchema);