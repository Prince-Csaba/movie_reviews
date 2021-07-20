const Review = require('../models/Review');
const User = require('../models/User');

exports.commentReview = async (req, res) => {

  const { google_id, full_name, movie_title, movie_id, comment } = req.body

  const user = await User.findOne({ google_id: google_id })
  const review = await Review.find()

  const newReview = new Review({
    google_id: google_id,
    full_name: full_name,
    movie_title: movie_title,
    movie_id: movie_id,
    comment: comment
  })

  const userReview = {
    movie_title: movie_title,
    movie_id: movie_id,
    comment: comment
  }

  await user.comment.unshift(userReview)

  await newReview.save()
  await user.save()

  res.json("Success!")
}