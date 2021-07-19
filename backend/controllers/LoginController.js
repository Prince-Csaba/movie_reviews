const axios = require('axios');
const { uniqueUser } = require('./UniqueController');

exports.googleLogin = (req, res) => {
  const code = req.body.code;

  const url = 'https://oauth2.googleapis.com/token';

  const body = {
    code,
    client_id: '812824398261-5ofavj8ubto60jeir8haq2rulvuidha0.apps.googleusercontent.com',
    client_secret: 'gppNNZao8lHYVf6SJTGbVbVt',
    redirect_uri: 'http://localhost:3000/login',
    grant_type: 'authorization_code',
  };

  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(url, body, config)
    .then((response) => {
      uniqueUser(response.data, res);
    })
    .catch((err) => console.log(err.response.data));
};
