const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  vehicleType:{
    type: String,
  },
  date: {
    type: String,
    required:true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
