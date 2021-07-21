const router = require('express').Router();
const { googleLogin } = require('../controllers/LoginController');
const { commentReview } = require('../controllers/ReviewController');
const { getReview } = require('../controllers/GetReviewController')
const { getMovie } = require('../controllers/MovieController')

router.get('/movie/:movie', getMovie);

router.post('/api/login', googleLogin);

router.post("/api/review", commentReview)

router.post("/api/getReview", getReview)

module.exports = router;