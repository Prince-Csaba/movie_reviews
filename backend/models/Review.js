const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
