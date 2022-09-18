import React from "react";
import { getImage } from "gatsby-plugin-image";
import BackgroundImage from "gatsby-background-image";
import { convertToBgImage } from "gbimage-bridge";

export default function Reviews({ reviews }) {
  console.log(reviews);

  return (
    <>
      <div className="flex flex-col bg-main-green">
        <div className="flex overflow-x-scroll pb-10 xl:justify-center xl:scrollbar-hide">
          <div className="flex flex-nowrap snap-mandatory snap-x">
            {reviews.map((review, index) => {
              let image = getImage(review.bgImage);
              let bgImage = convertToBgImage(image);
              return (
                <div
                  className="inline-block snap-mandatory snap-x "
                  key={index}
                >
                  <BackgroundImage
                    className="w-136 h-128 max-w-xs snap-mandatory snap-x overflow-hidden rounded-lg shadow-md mr-8 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-center items-center "
                    {...bgImage}
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "-50px 0",
                    }}
                  >
                    <div className="flex flex-col justify-center items-center backdrop-blur-sm bg-second-gold/20 rounded h-128 px-8">
                      <h4 className=" z-10 my-6 text-white font-serif text-lg text-center">
                        {review.review}
                      </h4>
                      <p className="text-white font-semibold text-lg">
                        {review.reviewerName}
                      </p>
                    </div>
                  </BackgroundImage>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
