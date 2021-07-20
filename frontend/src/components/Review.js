import React, { useState, useEffect } from 'react'

function Review() {
  const [radio, setRadio] = useState("movie-title")

  console.log(radio)
  return (
    <div>
      <div className="search">
        <h1>Search Movies</h1>
        <input></input>
        <button type="">Search</button>
        <label htmlFor="movie-title">Search by Movie Title</label>
        <input type="radio" name="searchBy" value="movie-title" onChange={() => setRadio("movie-title")} checked={radio === "movie-title"} ></input>
        <label htmlFor="user">Search by Users</label>
        <input type="radio" name="searchBy" value="user" onChange={() => setRadio("user")} checked={radio === "user"} ></input>
      </div>
    </div>
  )
}

export default Review
