import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BackgroundImage from "gatsby-background-image";
import { convertToBgImage } from "gbimage-bridge";

export default function Reviews({ reviews }) {
  return (
    <>
      <div className="flex flex-col bg-main-green">
        <div className="flex overflow-x-scroll pb-10 xl:justify-center xl:scrollbar-hide">
          <div className="flex flex-nowrap snap-mandatory snap-x">
            {reviews.map((review, index) => {
              let image = getImage(review.bgImage);
              let mediaLogo = getImage(review.mediaLogo.companyLogo);
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
                      backgroundPosition: "-40px 0",
                    }}
                  >
                    <a
                      href={review.articleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex flex-col justify-between py-20 items-center backdrop-blur-md bg-main-green-shade/50 rounded h-128 px-6">
                        <h2 className="z-10 my-6 font-bold text-white font-serif text-3xl text-center leading-normal">
                          {review.headline} 🔗
                        </h2>
                        <div className="">
                          <GatsbyImage
                            image={mediaLogo}
                            alt={`something needs to go here`}
                          />
                        </div>
                      </div>
                    </a>
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
