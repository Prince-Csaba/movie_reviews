const Review = require('../models/Review');

exports.getReview = async (req, res) => {
  const { searchValue, radioValue } = req.body

  const reviewArray = await Review.find()

  if (radioValue === "movie-title") {
    const movieArray = reviewArray.filter((review) => review.movie_title.toLowerCase().includes(searchValue.toLowerCase()))
    return res.json(movieArray)
  } else {
    const userArray = reviewArray.filter((review) => review.full_name.toLowerCase().includes(searchValue.toLowerCase()))
    return res.json(userArray)
  }

}