import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";

export default function ImageModal({
  imagePairs,
  onClose,
  currentIndex,
  onNext,
  onPrev,
}) {
  const currentImagePair = imagePairs[currentIndex];
  const dynamicImageBefore = useContentfulImage({
    image: {
      url:
        currentImagePair.before.gatsbyImageData.images.sources[0].srcSet ||
        currentImagePair.before.gatsbyImageData.images.fallback.srcSet,
      width: 3000,
      height: 3000,
      backgroundPosition: "top",
    },
  });
  const dynamicImageAfter = useContentfulImage({
    image: {
      url:
        currentImagePair.after.gatsbyImageData.images.sources[0].srcSet ||
        currentImagePair.after.gatsbyImageData.images.fallback.srcSet,
      width: 3000,
      height: 3000,
      backgroundPosition: "top",
    },
  });

  const beforeAndAfterDescription = `*Experience a lifted, rounder, and more sculpted backside without
  surgery.`;
  //TODO: If this information comes with imagePairs, replace it to make it work!

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="p-4 rounded flex flex-col justify-center overflow-auto max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full max-w-4xl">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            className="absolute left-0 top-[45%] z-10 px-4 md:px-12 lg:px-4 text-white text-3xl"
            aria-label="Previous image"
          >
            <FontAwesomeIcon
              className="text-white text-3xl p-6 font-light"
              icon={faArrowLeft}
            />
          </button>
          {/* Before Image */}
          <div className="w-1/2 relative">
            <GatsbyImage
              image={dynamicImageBefore}
              className="w-full h-full object-cover aspect-[3/4]"
              alt={currentImagePair.before.title}
            />
          </div>
          {/* After Image */}
          <div className="w-1/2 relative">
            <GatsbyImage
              image={dynamicImageAfter}
              className="w-full h-full object-cover aspect-[3/4]"
              alt={currentImagePair.after.title}
            />
          </div>
          {/* Next Button */}

          <button
            onClick={onNext}
            className="absolute right-0 top-[45%] px-4 md:px-12 lg:px-4 z-10 text-white text-3xl"
            aria-label="Next image"
          >
            <FontAwesomeIcon
              className="text-white text-3xl p-6 font-light"
              icon={faArrowRight}
            />
          </button>
        </div>
        <div className="flex flex-col text-center text-white">
          <div className="flex flex-row justify-center font-bold lg:text-lg">
            <div className="bg-main-green w-1/2 text-center py-3 lg:py-4 bg-gradient-to-l from-black/0 to-transparent">
              <span>Before</span>
            </div>
            <div className="bg-main-green w-1/2 text-center py-3 lg:py-4 bg-gradient-to-l from-black/10 to-transparent">
              <span>After</span>
            </div>
          </div>
          {beforeAndAfterDescription ? (
            <div className="border-white border-[1px] bg-black/50 w-full mt-4 py-4 lg:py-5 px-8 lg:px-16 text-sm">
              {beforeAndAfterDescription}
            </div>
          ) : null}
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
