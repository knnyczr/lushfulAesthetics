import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Reviews({ reviews }) {
  // console.log(reviews[0].bgImage.file.url);
  // console.log(reviews);

  const bgImage = reviews[0].bgImage.file.url;
  const options = {
    dragFree: true,
    dragFreeOptions: {
      speed: 2,
      bounce: true,
    },
    containScroll: "trimSnaps",
    loop: false,
    align: "start",
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    }
  }, [emblaApi]);

  return (
    <>
      {/* Background image */}
      <div className="relative w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat filter blur-lg"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "50% 3%",
          }}
        />

        {/* Card view */}
        <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-6 2xl:px-0 py-16 lg:py-24 max-w-[1535px] mx-auto">
          <div
            className="overflow-hidden md:overflow-x-auto overflow-y-hidden"
            ref={emblaRef}
            style={{ scrollbarGutter: "stable both-edges" }}
          >
            <div className="flex flex-row gap-4">
              {reviews.map((review, index) => {
                const mediaLogo = getImage(review.mediaLogo.companyLogo);
                return (
                  <a
                    key={index}
                    href={review.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read the review article (opens in a new tab)"
                    className="flex-none pt-0 md:pt-4 p-4 pb-8 bg-white bg-opacity-25 backdrop-blur-2xl rounded-lg shadow-lg flex flex-col items-center w-[250px] gap-6"
                  >
                    <div className="h-full flex flex-col justify-center items-center">
                      <GatsbyImage
                        image={mediaLogo}
                        alt={review.mediaLogo.companyName}
                        className="w-[70%] h-auto object-contain"
                      />
                    </div>
                    <div className="h-1/3 flex flex-col justify-end items-center text-center">
                      <p className="mb-4 text-lg font-bold font-serif pt-4">
                        {review.headline}
                      </p>
                      <button className="md:hidden border-[1px] border-black rounded-full px-4 py-[4px] text-sm">
                        Tap for more
                      </button>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
