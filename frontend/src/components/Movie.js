import React, { useState, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../App';

function Movie({ movie }) {
  const [comment, setComment] = useState(false)
  const [text, setText] = useState("")
  const user = useContext(UserContext)

  let formData = {
    google_id: user.google_id,
    full_name: user.full_name,
    movie_title: movie.title,
    movie_id: movie.id,
    comment: text
  }

  const reviewBtn = () => {
    axios
      .post("http://localhost:8080/api/review", formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))

    setText("")
    setComment(false)
  }

  return (
    <div className="movie">
      <h3>{movie.title}</h3>
      <p>{movie.vote_average}</p>
      <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} />
      <p>{movie.overview}</p>
      <button onClick={() => setComment(true)}>Review</button>
      {comment && (
        <div>
          <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)}></textarea>
          <button onClick={reviewBtn}>Comment</button>
        </div>
      )
      }
    </div >
  )
}

export default Movie
