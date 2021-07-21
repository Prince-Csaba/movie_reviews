import React from 'react'

function ReviewCard({review}) {
  return (
    <div className="review-card">
      <h3>{review.movie_title}</h3>
      <h4>{review.full_name}</h4>
      <p>Comment: {review.comment}</p>
      <p>{review.date.toString().slice(0,10)}</p>

    </div>
  )
}

export default ReviewCard
