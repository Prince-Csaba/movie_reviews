const Review = require('../models/Review');
const User = require('../models/User');

exports.commentReview = async (req, res) => {

  const { google_id, full_name, movie_title, movie_id, comment } = req.body

  const user = await User.findOne({ google_id: google_id })

  const review = await Review.find()





}