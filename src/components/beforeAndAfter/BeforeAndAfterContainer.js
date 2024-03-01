import React, { useState, useEffect } from "react";
import ImageWithOverlay from "./ImageWithOverlay";
import ImageModal from "./ImageModal";
import { VimeoPlayer } from "reactjs-vimeo-player";

export default function BeforeAndAfterContainer({
  beforeAfterVideos,
  beforeAndAfters,
  shouldVerifyAge,
  onVerifyAge,
}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isImagePairOpen, setIsImagePairOpen] = useState(false);
  const [currentImagePairIndex, setCurrentImagePairIndex] = useState(0);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isImagePairOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImagePairOpen]);

  const handleImagePairClick = (imagePair, index) => {
    if (shouldVerifyAge) {
      setShowAgeModal(true);
    } else {
      setIsImagePairOpen(imagePair);
      setCurrentImagePairIndex(index);
    }
  };

  const onNext = () => {
    setCurrentImagePairIndex(
      (currentImagePairIndex + 1) % beforeAndAfters.length
    );
  };

  const onPrev = () => {
    setCurrentImagePairIndex(
      (currentImagePairIndex - 1 + beforeAndAfters.length) %
        beforeAndAfters.length
    );
  };

  const renderImagePairs = (count) => {
    return beforeAndAfters.slice(0, count).map((imagePair, index) => (
      <div
        key={index}
        className="col-span-2 md:col-span-1 flex cursor-pointer"
        onClick={() => {
          shouldVerifyAge
            ? onVerifyAge()
            : handleImagePairClick(imagePair, index);
        }}
      >
        <ImageWithOverlay
          src={imagePair.before}
          alt={imagePair.before.title}
          overlayText="BEFORE"
          type="Before"
          shouldBlur={shouldVerifyAge}
        />
        <ImageWithOverlay
          src={imagePair.after}
          alt={imagePair.after.title}
          overlayText="AFTER"
          type="After"
          shouldBlur={shouldVerifyAge}
        />
      </div>
    ));
  };

  console.log("shouldVerifyAge", shouldVerifyAge);

  return (
    <>
      <div className="flex flex-col justify-between px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24">
        <div className="w-full flex flex-row justify-between">
          <span className="my-5 text-3xl font-serif font-bold">
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
        {beforeAfterVideos && (
          <div className="flex w-full justify-center">
            <VimeoPlayer className="" id={beforeAfterVideos} />
          </div>
        )}
      </div>
      {isImagePairOpen && (
        <ImageModal
          imagePairs={beforeAndAfters}
          currentIndex={currentImagePairIndex}
          onClose={() => setIsImagePairOpen(false)}
          onNext={onNext}
          onPrev={onPrev}
          totalImages={beforeAndAfters.length}
        />
      )}
    </>
  );
}
