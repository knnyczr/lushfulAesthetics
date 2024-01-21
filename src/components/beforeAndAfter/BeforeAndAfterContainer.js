import React, { useState, useEffect } from "react";
import ImageWithOverlay from "./ImageWithOverlay";
import ImageModal from "./ImageModal";

export default function BeforeAndAfterContainer({
  beforeAfterVideos,
  beforeAndAfters,
}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isImagePairOpen, setIsImagePairOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isImagePairOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImagePairOpen]);

  const renderImagePairs = (count) => {
    return beforeAndAfters.slice(0, count).map((imagePair, index) => (
      <div
        key={index}
        className="col-span-2 md:col-span-1 flex cursor-pointer"
        onClick={() => setIsImagePairOpen(imagePair)}
      >
        <ImageWithOverlay
          src={imagePair.before}
          alt={imagePair.before.title}
          overlayText="BEFORE"
          type="Before"
        />
        <ImageWithOverlay
          src={imagePair.after}
          alt={imagePair.after.title}
          overlayText="AFTER"
          type="After"
        />
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col justify-between px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24">
        <div className="w-full flex flex-row justify-between">
          <span className="text-3xl font-serif font-bold">
            Before and After
          </span>
          {beforeAndAfters && beforeAndAfters.length > 2 && (
            <button
              className="font-sans font-bold"
              onClick={() => {
                setIsViewAll(!isViewAll);
              }}
            >
              {isViewAll ? "View Less" : "View All"}
            </button>
          )}
        </div>
        {beforeAndAfters && (
          <div className="grid grid-cols-2 gap-8 mt-8">
            {isViewAll
              ? renderImagePairs(beforeAndAfters.length)
              : renderImagePairs(2)}
          </div>
        )}
        {/* TODO: LBA-45 none working component to integrate vimeo videos */}
        {beforeAfterVideos && (
          <iframe
            src={beforeAfterVideos}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
        )}
      </div>
      {isImagePairOpen && (
        <ImageModal
          imagePair={isImagePairOpen}
          onClose={() => setIsImagePairOpen(false)}
        />
      )}
    </>
  );
}
