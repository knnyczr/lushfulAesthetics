import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Reviews({ reviews }) {
  return (
    <>
      <div class="flex flex-col bg-main-green">
        <div class="flex overflow-x-scroll pb-10 xl:justify-center xl:scrollbar-hide">
          <div class="flex flex-nowrap snap-mandatory snap-x">
            {reviews.map((review, index) => (
              <div class="inline-block snap-mandatory snap-x" key={index}>
                <div
                  class="w-64 h-64 max-w-xs snap-mandatory snap-x overflow-hidden rounded-lg shadow-md mr-8 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-center items-center p-6"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div>
                    <h4 className="z-10 text-white font-serif text-lg text-center">
                      {review.review}
                    </h4>
                  </div>
                  <div className="my-4">
                    {review.fromPackage && (
                      <h6 className="text-white border text-xs font-bold  border-white rounded-3xl px-4 py-2">
                        {review.fromPackage}
                      </h6>
                    )}
                  </div>
                  <div>
                    <p className="text-white text-sm font-light">
                      {review.reviewerName}, {review.reviewerAge},{" "}
                      {review.reviewerLocation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
