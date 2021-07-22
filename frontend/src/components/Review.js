import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReviewCard from './ReviewCard';

function Review() {
  const [radio, setRadio] = useState("movie-title")
  const [search, setSearch] = useState("")
  const [review, setReview] = useState(null)

  let reviewData = {
    searchValue: search,
    radioValue: radio
  }

  const getReview = () => {
    axios
      .post('http://localhost:8080/api/getReview', reviewData)
      .then((res) => {
        setReview(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <div className="search-container">
      <h1>Search Comments</h1>
      <div className="search">
        <div className="wrapper">
          <input type="radio" name="searchBy" value="movie-title" onChange={() => setRadio("movie-title")} checked={radio === "movie-title"} id="option-1" ></input>
          <input type="radio" name="searchBy" value="user" onChange={() => setRadio("user")} checked={radio === "user"} id="option-2"></input>
          <label htmlFor="option-1" className="option option-1">
            <div className="dot"/>
            <span>Movies</span>
          </label>
          <label htmlFor="option-2" className="option option-2">
            <div className="dot"/>
            <span>Users</span>
          </label>
        </div>    
        <input value={search} onChange={(e) => setSearch(e.target.value)} id="search-input"></input>
        <button onClick={getReview}>Search</button>
      </div>
      <div className="reviewcard-container">
        {
          review && review.map((review,i) => <ReviewCard review={review} key={i}/>)
        }
      </div>
    </div>
  )
}

export default Review
