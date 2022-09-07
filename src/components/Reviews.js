import React from "react";

export default function Reviews({ reviews }) {
  console.log(`here is the review:`, reviews);
  return (
    <>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center md:w-96 md:h-80 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white m-4 px-8 py-16"
        >
          <div>
            <h4 className="font-serif text-2xl text-center">{review.review}</h4>
          </div>
          <div className="mt-4">
            {review.fromPackage ? (
              <h6 className="text-sm font-semibold border border-white rounded-3xl py-2 px-2">
                {review.fromPackage}
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <p className="my-6 font-light text-sm">
              {review.reviewerName}, {review.reviewerAge},{" "}
              {review.reviewerLocation}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
