const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
    },
    vehicleType:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    message:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("Contact Details", contactSchema);