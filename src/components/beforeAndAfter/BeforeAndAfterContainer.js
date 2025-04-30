import React, { useState, useEffect, useContext } from "react";
import ImageWithOverlay from "./ImageWithOverlay";
import ImageModal from "./ImageModal";
import { VimeoPlayer } from "reactjs-vimeo-player";
import { Context } from "../Context";
import beforeAndAfterContainerOptions from "../../helpers/beforeAndAfterContainerOptions";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import AnchorLinkComponent from "../AnchorLinkComponent";

export default function BeforeAndAfterContainer({
  serviceTitle,
  beforeAfterVideos,
  beforeAndAfters,
  beforeAfterServiceDescriptionRichText,
  shouldVerifyAge,
  shouldCaptureEmail,
  onVerifyAge,
  slug,
}) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [isImagePairOpen, setIsImagePairOpen] = useState(false);
  const [currentImagePairIndex, setCurrentImagePairIndex] = useState(0);

  const { user, setUser } = useContext(Context);

  async function setUserTags(user) {
    await (() => {
      return fetch("/api/mailchimp_set_tags", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...user, serviceTitle }),
      });
    })();
    // .then((res) => res.json())
  }

  useEffect(() => {
    document.body.style.overflow = isImagePairOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImagePairOpen]);

  const handleImagePairClick = (imagePair, index) => {
    if (user.email) {
      setUserTags(user);
    }
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

  const renderImagePairs = (count) => {
    return beforeAndAfters.slice(0, count).map((imagePair, index) => (
      <div
        // TODO: jsx-a11y/click-events-have-key-events descriptive images?
        key={index}
        className="col-span-2 md:col-span-1 flex cursor-pointer"
        onClick={() => {
          shouldVerifyAge || (shouldCaptureEmail && !user.email)
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

  const options = beforeAndAfterContainerOptions();

  return (
    <>
      <div
        className={`flex flex-col justify-between px-4 pt-16 ${
          !beforeAfterVideos && `pb-16`
        } h-full sm:px-6 md:px-12 lg:px-24 lg:py-24`}
      >
        <div className="w-full flex flex-row justify-between">
          <AnchorLinkComponent
            slug={`${slug}/${serviceTitle}/#beforeAndAfters`}
            pricingSlug={`#beforeandafter`}
          >
            <span className="my-5 text-3xl font-serif font-bold">
              Before and After
            </span>
          </AnchorLinkComponent>

          {beforeAndAfters && beforeAndAfters.length > 2 && (
            <button
              className="font-sans font-bold hidden md:inline-block"
              onClick={() => {
                setIsViewAll(!isViewAll);
              }}
            >
              {isViewAll ? "View Less" : "View All"}
            </button>
          )}
        </div>
        {beforeAfterServiceDescriptionRichText && (
          <p className="mb-4">
            {renderRichText(beforeAfterServiceDescriptionRichText, options)}
          </p>
        )}
        {beforeAndAfters && (
          <div className="grid grid-cols-2 gap-8 mt-8">
            {isViewAll
              ? renderImagePairs(beforeAndAfters.length)
              : renderImagePairs(2)}
          </div>
        )}
        {beforeAfterVideos && (
          <div className="flex justify-center">
            <VimeoPlayer
              className="w-1/2 justify-center flex mx-auto"
              id={beforeAfterVideos}
            />
          </div>
        )}
        {beforeAndAfters && beforeAndAfters.length > 2 && (
          <button
            className="mt-8 py-3 border-black border font-sans font-bold md:hidden"
            onClick={() => {
              setIsViewAll(!isViewAll);
            }}
          >
            {isViewAll ? "View Less" : "View All"}
          </button>
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
