const request = require('request');

exports.getMovie = async (req, res) => {
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

    res.json(JSON.parse(body))
  })
}