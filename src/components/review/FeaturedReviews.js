import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function FeaturedReviews({ data }) {
  const { heroimage } = data;

  const reviews = [
    {
      name: data.reviewerName,
      content: data.reviewContent?.reviewContent,
    },
    {
      name: data.reviewerName2,
      content: data.reviewContent2?.reviewContent2,
    },
    {
      name: data.reviewerName3,
      content: data.reviewContent3?.reviewContent3,
    },
    {
      name: data.reviewerName4,
      content: data.reviewContent4?.reviewContent4,
    },
  ].filter((r) => r.name?.trim() && r.content?.trim());

  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev - 1 + total) % total);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 13500); // 13.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount or update
  }, [total]);

  if (reviews.length === 0) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${heroimage?.url})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
      className="w-full h-[600px] relative"
      {...swipeHandlers}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/75" />

      {/* Fixed-positioned content area */}
      <div className="absolute inset-0 z-20 flex items-end justify-start">
        <div className="text-white px-4 py-6 sm:p-6 md:px-12 md:py-6 lg:px-24 lg:py-12 max-w-[1536px] w-full mx-auto">
          <h5 className="text-sm lg:text-lg mb-3 lg:mb-4 pr-0 lg:pr-96">
            &quot;{reviews[current].content}&quot;
          </h5>
          <div className="flex flex-row items-center gap-2 w-full mb-4">
            <div className="w-10 h-10 bg-[#626161] rounded-full flex items-center justify-center">
              {reviews[current].name?.charAt(0)}
            </div>
            <p className="font-sans capitalize">{reviews[current].name}</p>
          </div>

          <div className="flex flex-row items-center justify-between w-full max-w-[1536px] lg:pr-96">
            {/* Dot indicators */}
            <div className="flex gap-2 items-center">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    current === idx
                      ? "bg-white scale-105"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            {/* Carousel Controls - Hidden on mobile */}
            <div className="hidden lg:flex items-center">
              {/* Prev */}
              <button
                onClick={prev}
                className="p-4 -ml-2"
                aria-label="Previous review"
              >
                <svg
                  width="40"
                  height="10"
                  viewBox="0 0 40 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-auto rotate-180"
                >
                  <path
                    d="M1 6 H39 M31 1 L39 6 L31 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="p-4 -mr-2"
                aria-label="Next review"
              >
                <svg
                  width="40"
                  height="10"
                  viewBox="0 0 40 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-auto"
                >
                  <path
                    d="M1 6 H39 M31 1 L39 6 L31 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
