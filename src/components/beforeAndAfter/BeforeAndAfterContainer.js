import React, { useState, useEffect } from "react";
import ImageWithOverlay from "./ImageWithOverlay";
import ImageModal from "./ImageModal";
import { VimeoPlayer } from "reactjs-vimeo-player";
import Vimeo from "@u-wave/react-vimeo";

export default function BeforeAndAfterContainer({
  beforeAfterVideos,
  beforeAndAfters,
  shouldVerifyAge,
  shouldCaptureEmail,
  onVerifyAge,
}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isImagePairOpen, setIsImagePairOpen] = useState(false);
  const [currentImagePairIndex, setCurrentImagePairIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isImagePairOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImagePairOpen]);

  const handleImagePairClick = (imagePair, index) => {
    setIsImagePairOpen(imagePair);
    setCurrentImagePairIndex(index);
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

  const handlePlay = () => {
    // TODO: if ageVerification
    // TODO: pause state
    // TODO: check if needs to be age verified.
    // TODO: open the popup
    // TODO: if we verify, play video
    setIsPaused(true);
    onVerifyAge();
    console.log(isPaused);
  };

  const renderImagePairs = (count) => {
    return beforeAndAfters.slice(0, count).map((imagePair, index) => (
      <div
        key={index}
        className="col-span-2 md:col-span-1 flex cursor-pointer"
        onClick={() => {
          shouldVerifyAge || shouldCaptureEmail
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

  return (
    <>
      <div
        className={`flex flex-col justify-between px-4 pt-16  h-full ${
          !beforeAfterVideos ? "" : `pb-16`
        } sm:px-6 md:px-12 lg:px-24 lg:py-24`}
      >
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
          <div className="flex justify-center">
            <Vimeo
              className="justify-center flex mx-auto"
              paused={isPaused}
              video={beforeAfterVideos}
              onPlay={() => handlePlay()}
            />
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
