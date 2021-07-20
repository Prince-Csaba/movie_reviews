import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Movie from './Movie';
import { UserContext } from '../App';

function Home() {

  const [movie, setMovie] = useState("");
  const [movieRes, setMovieRes] = useState(null);

  const searchMovie = async () => {
    await axios
      .get(`http://localhost:8080/movie/${movie}`)
      .then((res) => {
        setMovieRes(res.data)
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <input type="text" placeholder="Search Movie" onChange={(e) => { setMovie(e.target.value) }}></input>
      <button onClick={searchMovie}>Search</button>
      <div className="movie-card">
        {movieRes && movieRes.results.map((movie, i) => <Movie movie={movie} key={i} />)}
      </div>
    </div>
  )
}

export default Home
