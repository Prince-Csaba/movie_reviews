const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const allowCors = require('./middleware/allowCors');
const corsOptions = require('./utils/corsOptions');
const notExists = require('./middleware/notExists');
const mainRoute = require('./routes/main');


// Init Middleware
app.use(express.json());
app.use(allowCors);
app.use(cors(corsOptions));

//GET - Basic route
//Public
app.get('/', (req, res) => {
	res.json('Backend is on')
});

app.use('/', mainRoute);

app.use(notExists);

module.exports = app;