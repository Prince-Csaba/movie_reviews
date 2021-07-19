const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const request = require('request');
const allowCors = require('./middleware/allowCors');
const corsOptions = require('./utils/corsOptions');
const notExists = require('./middleware/notExists');

const { googleLogin } = require('./controllers/LoginController');

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
app.get('/movie/:movie', async (req, res) => {
	const options = {
		uri: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${req.params.movie}`,
		method: 'GET',
		headers: 'Content-type:application/json'
	};

	await request(options, (error, response, body) => {
		if (error) console.error(error);

		if (response.statusCode !== 200) {
			return res.status(404).json({ msg: 'Something is not ok' });
		}

		res.send(body)
	})

	//login try (based on Riki)
	app.post("/api/login", googleLogin)

});

app.use(notExists);

module.exports = app;