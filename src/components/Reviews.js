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
              <div class="inline-block snap-mandatory snap-x " key={index}>
                <div
                  className="w-136 h-128 max-w-xs snap-mandatory snap-x overflow-hidden rounded-lg shadow-md mr-8 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-center items-center "
                  style={{
                    background:
                      "url(https://images.ctfassets.net/eh73f2j8s7u9/gDcklQ9lZDLFNJgqzlsmx/d26c9915e17ece615510027e3d3625db/AdobeStock_159506421.jpeg)",
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

                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
