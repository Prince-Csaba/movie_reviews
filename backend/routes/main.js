const router = require('express').Router();
const { googleLogin } = require('../controllers/LoginController');
const { commentReview } = require('../controllers/ReviewController');

router.post('/login', googleLogin);

router.post("/review", commentReview)