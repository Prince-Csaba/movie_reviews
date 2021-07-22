import React from 'react'

function ReviewCard({review}) {
  return (
    <div className="review-card">
      <h3>{review.movie_title}</h3>
      <div className="card">
        <h4>{review.full_name}</h4>
        <p id="comment">{review.comment}</p>
      </div>
        <p id="date">{review.date.toString().slice(0,10)}</p>
    </div>
  )
}

export default ReviewCard
