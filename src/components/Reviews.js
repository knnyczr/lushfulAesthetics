import React from "react";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

export default function Reviews({ reviews }) {
  let img = getImage(reviews.bgImage);
  return (
    <>
      <div class="flex flex-col bg-main-green">
        <div class="flex overflow-x-scroll pb-10 xl:justify-center xl:scrollbar-hide">
          <div class="flex flex-nowrap snap-mandatory snap-x">
            {reviews.map((review, index) => (
              <div class="inline-block snap-mandatory snap-x" key={index}>
                <StaticImage src={img} />
                <div
                  className="w-64 h-64 max-w-xs snap-mandatory snap-x overflow-hidden rounded-lg shadow-md mr-8 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-center items-center p-6"
                  style={{
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
                      {review.reviewerName}
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
