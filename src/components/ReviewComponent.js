import React from "react";

export function ReviewCard({
  review: { review, reviewerName, reviewerAge, reviewerLocation },
}) {
  return (
    <div>
      <h1>{review}</h1>
      <p>
        {reviewerName} {reviewerAge}, {reviewerLocation}
      </p>
    </div>
  );
}

export default function ReviewComponent({ reviews }) {
  console.log(reviews);
  return (
    <div>
      {reviews.map((review, idx) => (
        <ReviewCard key={idx} review={review} />
      ))}
    </div>
  );
}
