const mongoose = require('mongoose');

// Define Rider Schema
const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: Number,
    required: true
  },
  drivingPapers:{
    type: String
  },
  preOwned:{
    type: Number,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Create Rider model
const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
