import React, { useState, useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import hardcodedReviews from "../../data/hardcoded-reviews.json";
import {
  fetchLatestGoogleReviews,
  mergeReviews,
  formatReviewDate,
} from "../../utils/fetchGoogleReviews";
import { Link } from "gatsby";

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
  const REVIEWS_PER_PAGE = 8; // Updated from 4 to 10
  const MAX_REVIEWS = 200; // Increased to accommodate all hardcoded + Google reviews

  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsHeaderRef = useRef(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to the reviews header
    if (reviewsHeaderRef.current) {
      reviewsHeaderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Fetch latest Google reviews from API
        const latestGoogleReviews = await fetchLatestGoogleReviews();
        console.log("Latest Google reviews from API:", latestGoogleReviews);

        // Merge hardcoded reviews with static Google reviews and latest API reviews
        const staticGoogleReviews = childrenGooglePlacesReview || [];
        console.log("Static Google reviews from Gatsby:", staticGoogleReviews);
        const allGoogleReviews = [
          ...latestGoogleReviews,
          ...staticGoogleReviews,
        ];

        // Remove duplicates from Google reviews
        const uniqueGoogleReviews = allGoogleReviews.filter(
          (review, index, self) =>
            index ===
            self.findIndex(
              (r) =>
                r.author_name === review.author_name && r.text === review.text
            )
        );

        // Merge with hardcoded reviews
        const mergedReviews = mergeReviews(
          hardcodedReviews,
          uniqueGoogleReviews
        );

        setAllReviews(mergedReviews);
      } catch (error) {
        console.warn("Error loading reviews:", error);
        // Fallback to just using static reviews if API fails
        const mergedReviews = mergeReviews(
          hardcodedReviews,
          childrenGooglePlacesReview
        );
        setAllReviews(mergedReviews);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [childrenGooglePlacesReview]);

  const limitedReviews = allReviews.slice(0, MAX_REVIEWS);
  const totalPages = Math.ceil(limitedReviews.length / REVIEWS_PER_PAGE);
  const start = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = limitedReviews.slice(start, start + REVIEWS_PER_PAGE);

  if (isLoading) {
    return (
      <>
        <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
          Patient Reviews
        </div>
        <div className="h-0.5 bg-black"></div>
        <div className="grid">
          <div className="py-6 text-center text-gray-500">
            Loading reviews...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={reviewsHeaderRef}
        className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4 scroll-mt-48"
      >
        Patient Reviews
      </div>
      <div className="h-0.5 bg-black"></div>

      <div className="grid">
        {currentReviews.map((review, index) => {
          const initial = review.author_name?.charAt(0).toUpperCase() || "?";
          const bgColor = getRandomBg();

          return (
            <div
              key={`${review.author_name}-${index}`}
              className="border-b-[1px] border-black last:border-b-0 py-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-500 text-2xl">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                {/* {review.time && (
                  <div className="text-gray-500 text-sm">
                    {formatReviewDate(review.time)}
                  </div>
                )} */}
              </div>
              <p className="text-gray-700 text-base my-3 whitespace-pre-line">
                {review.text}
              </p>
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
                <Link
                  to="https://www.google.com/maps/place/Lushful+Aesthetics/@40.7489513,-73.9881656,17z/data=!4m8!3m7!1s0x89c259429325c2d5:0xbf501673e984ea40!8m2!3d40.7489513!4d-73.9855907!9m1!1b1!16s%2Fg%2F11rsjy0l8v"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StaticImage
                    src="../../images/g.webp"
                    alt="Google"
                    width={36}
                    height={36}
                    className="ml-auto"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {(() => {
            const pages = [];
            const maxVisiblePages = 6;

            if (totalPages <= maxVisiblePages) {
              // Show all pages if total is small
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Always show page 1
              pages.push(1);

              if (currentPage <= 4) {
                // Show 1, 2, 3, 4, 5, 6, ... 20
                for (let i = 2; i <= 6; i++) {
                  pages.push(i);
                }
                if (totalPages > 6) {
                  pages.push("...");
                  pages.push(totalPages);
                }
              } else if (currentPage >= totalPages - 3) {
                // Show 1, ... 15, 16, 17, 18, 19, 20
                if (totalPages > 7) {
                  pages.push("...");
                }
                for (
                  let i = Math.max(2, totalPages - 5);
                  i <= totalPages;
                  i++
                ) {
                  pages.push(i);
                }
              } else {
                // Show 1, ... 7, 8, 9, ... 20
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                  pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
              }
            }

            return pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-4 py-2 text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 uppercase text-sm tracking-wide ${
                    isActive
                      ? "bg-main-green text-white"
                      : "bg-white text-black hover:bg-main-green hover:text-white"
                  } transition duration-200`}
                >
                  {page}
                </button>
              );
            });
          })()}
        </div>
      )}
    </>
  );
}
