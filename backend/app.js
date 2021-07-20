const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
//const request = require('request');
const allowCors = require('./middleware/allowCors');
const corsOptions = require('./utils/corsOptions');
const notExists = require('./middleware/notExists');

const { googleLogin } = require('./controllers/LoginController');
const { commentReview } = require('./controllers/ReviewController')
const { getMovie } = require('./controllers/MovieController')
const { getReview } = require('./controllers/GetReviewController')


// Init Middleware
app.use(express.json());
app.use(allowCors);
app.use(cors(corsOptions));

//GET - Basic route
//Public
app.get('/', (req, res) => {
	res.send('Backend is on')
});

//GET - Some kind of movie
//Public
app.get('/movie/:movie', getMovie);

//login try (based on Riki)
app.post("/api/login", googleLogin)

app.post("/api/review", commentReview)

app.post("/api/getReview", getReview)

app.use(notExists);

module.exports = app;