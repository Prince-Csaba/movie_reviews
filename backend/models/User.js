const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
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
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
