import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useSwipeable } from "react-swipeable";

export default function ImageModal({
  imagePairs,
  onClose,
  currentIndex,
  onNext,
  onPrev,
  totalImages,
}) {
  const currentImagePair = imagePairs[currentIndex];
  const beforeLocal =
    currentImagePair?.before?.localFile?.childImageSharp?.gatsbyImageData;
  const beforeRemote = currentImagePair?.before?.gatsbyImageData;
  const dynamicImageBefore = getImage(beforeLocal || beforeRemote);

  const afterLocal =
    currentImagePair?.after?.localFile?.childImageSharp?.gatsbyImageData;
  const afterRemote = currentImagePair?.after?.gatsbyImageData;
  const dynamicImageAfter = getImage(afterLocal || afterRemote);

  const beforeDescription = currentImagePair.beforeImageDescription;
  const afterDescription = currentImagePair.afterImageDescription;

  //swipe handler
  const handles = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
  });

  //dots limitation
  const getDotStyle = (index, currentIndex, totalImages) => {
    const isStart = currentIndex === 0;
    const isEnd = currentIndex === totalImages - 1;
    const isMiddle = !isStart && !isEnd;

    // Define dot sizes and colors
    const activeDot = "w-[6px] h-[6px] bg-white";
    const regularDot = "w-[6px] h-[6px] bg-gray-400";
    const smallDot = "w-[5px] h-[5px] bg-gray-400";
    const smallestDot = "w-[4px] h-[4px] bg-gray-400";

    // Start: Active dot on left, decreasing size to the right
    if (isStart) {
      if (index === 0) return activeDot;
      if (index === 1) return regularDot;
      if (index === 2) return smallDot;
      return smallestDot;
    }

    // End: Active dot on right, decreasing size to the left
    if (isEnd) {
      if (index === totalImages - 1) return activeDot;
      if (index === totalImages - 2) return regularDot;
      if (index === totalImages - 3) return smallDot;
      return smallestDot;
    }

    // Middle: Active dot centered, smaller dots on either side
    if (isMiddle) {
      const middleIndex = Math.floor(totalImages / 2);
      if (index === currentIndex) return activeDot;
      if (index === currentIndex - 1 || index === currentIndex + 1)
        return regularDot;
      if (index === currentIndex - 2 || index === currentIndex + 2)
        return smallDot;
      return smallestDot;
    }
  };

  // which dots to display based on position
  const visibleDots = [];
  const isStart = currentIndex === 0;
  const isEnd = currentIndex === totalImages - 1;
  const isMiddle = !isStart && !isEnd;

  if (isStart) {
    for (let i = 0; i < 5; i++) {
      visibleDots.push(i);
    }
  } else if (isEnd) {
    for (let i = totalImages - 5; i < totalImages; i++) {
      visibleDots.push(i);
    }
  } else if (isMiddle) {
    const startIndex = Math.max(0, currentIndex - 3);
    const endIndex = Math.min(totalImages, currentIndex + 4);
    for (let i = startIndex; i < endIndex; i++) {
      visibleDots.push(i);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        {...handles}
        className="p-4 rounded flex flex-col justify-center overflow-auto max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full max-w-4xl">
          {/* Previous Button */}

          <button
            onClick={onPrev}
            className="hidden lg:block absolute left-0 top-[45%] z-10 px-4 md:px-12 lg:px-4 text-white text-3xl"
            aria-label="Previous image"
          >
            <FontAwesomeIcon
              className="text-white text-3xl p-6 font-light hidden lg:block"
              icon={faArrowLeft}
            />
          </button>

          {/* Before Image */}
          <div className="w-1/2 relative">
            {dynamicImageBefore && (
              <GatsbyImage
                image={dynamicImageBefore}
                className="w-full h-full object-cover aspect-[3/4]"
                alt={currentImagePair.before.title}
              />
            )}
          </div>
          {/* After Image */}
          <div className="w-1/2 relative">
            {dynamicImageAfter && (
              <GatsbyImage
                image={dynamicImageAfter}
                className="w-full h-full object-cover aspect-[3/4]"
                alt={currentImagePair.after.title}
              />
            )}
          </div>
          {/* Next Button */}

          <button
            onClick={onNext}
            className="hidden lg:block absolute right-0 top-[45%] px-4 md:px-12 lg:px-4 z-10 text-white text-3xl"
            aria-label="Next image"
          >
            <FontAwesomeIcon
              className="text-white text-3xl p-6 font-light hidden lg:block"
              icon={faArrowRight}
            />
          </button>
        </div>

        <div className="flex flex-col text-center text-white w-full">
          <div className="max-w-4xl flex flex-row justify-center lg:text-lg bg-main-green ">
            <div className="w-1/2 text-left px-6 py-4 bg-gradient-to-l from-black/10 to-transparent">
              <span className="font-bold">Before</span>
              {beforeDescription ? (
                <div className="font-normal text-sm mt-1">
                  {beforeDescription}
                </div>
              ) : null}
            </div>

            <div className="w-1/2 text-left px-6 py-4 bg-gradient-to-l from-black/10 to-transparent">
              <span className="font-bold">After</span>
              {afterDescription ? (
                <div className="font-normal text-sm mt-1">
                  {afterDescription}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center mt-4 space-x-1">
          {visibleDots.map((index) => (
            <button
              key={index}
              onClick={() => {
                if (index > currentIndex) {
                  onNext();
                } else if (index < currentIndex) {
                  onPrev();
                }
              }}
              className={`rounded-full ${getDotStyle(
                index,
                currentIndex,
                totalImages
              )}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="flex flex-row absolute top-0 right-0 px-4 py-4 md:px-12 lg:px-4"
        >
          <FontAwesomeIcon
            className="text-white text-3xl p-6 font-light"
            icon={faClose}
          />
        </button>
      </div>
    </div>
  );
}
