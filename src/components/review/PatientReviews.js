import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";

const getRandomBg = () => {
  const colors = [
    "bg-[#1E4C41]",
    "bg-[#3B86CB]",
    "bg-[#5F6BBA]",
    "bg-[#71269C]",
    "bg-[#886F65]",
    "bg-[#9D7342]",
    "bg-[#4D9D42]",
    "bg-[#42509D]",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function PatientReviews({ childrenGooglePlacesReview = [] }) {
  const REVIEWS_PER_PAGE = 4;
  const MAX_REVIEWS = 50;

  const limitedReviews = childrenGooglePlacesReview.slice(0, MAX_REVIEWS);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(limitedReviews.length / REVIEWS_PER_PAGE);
  const start = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = limitedReviews.slice(start, start + REVIEWS_PER_PAGE);

  return (
    <>
      <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
        Patient Reviews
      </div>
      <div className="h-0.5 bg-black"></div>

      <div className="grid">
        {currentReviews.map((review, index) => {
          const initial = review.author_name?.charAt(0).toUpperCase() || "?";
          const bgColor = getRandomBg();

          return (
            <div
              key={index}
              className="border-b-[1px] border-black last:border-b-0 py-6"
            >
              <div className="flex items-center text-yellow-500 text-2xl">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 text-base my-3">{review.text}</p>
              <div className="flex items-center py-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white mr-3 ${bgColor}`}
                >
                  {initial}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {review.author_name}
                  </p>
                </div>
                <StaticImage
                  src="../../images/g.webp"
                  alt="Google"
                  width={36}
                  height={36}
                  className="ml-auto"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 uppercase text-sm tracking-wide ${
                  isActive
                    ? "bg-main-green text-white"
                    : "bg-white text-black hover:bg-main-green hover:text-white"
                } transition duration-200`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
