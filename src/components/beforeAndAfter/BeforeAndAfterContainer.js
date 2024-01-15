import React, { useState, useEffect } from "react";
import ImageWithOverlay from "./ImageWithOverlay";
import ImageModal from "./ImageModal";

export default function BeforeAndAfterContainer() {
  const images = [
    {
      before:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      after:
        "https://images.unsplash.com/photo-1567324216289-97cc4134f626?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      before:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      after:
        "https://images.unsplash.com/photo-1586796676774-c93004ae009f?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      before:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      after:
        "https://images.unsplash.com/photo-1586796676774-c93004ae009f?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      before:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      after:
        "https://plus.unsplash.com/premium_photo-1675804300600-888042d9e90d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      before:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      after:
        "https://images.unsplash.com/photo-1586796676774-c93004ae009f?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [viewAll, setViewAll] = useState(false);
  const [isImagePairOpen, setIsImagePairOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isImagePairOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImagePairOpen]);

  const renderImagePairs = (count) => {
    return images.slice(0, count).map((imagePair, index) => (
      <div
        key={index}
        className="col-span-2 md:col-span-1 flex cursor-pointer"
        onClick={() => setIsImagePairOpen(imagePair)}
      >
        <ImageWithOverlay
          src={imagePair.before}
          alt={`Before Image ${index + 1}`}
          overlayText="BEFORE"
          type="Before"
        />
        <ImageWithOverlay
          src={imagePair.after}
          alt={`After Image ${index + 1}`}
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
          <button
            className="font-sans font-bold"
            onClick={() => {
              setViewAll(!viewAll);
            }}
          >
            {viewAll ? "View Less" : "View All"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          {viewAll ? renderImagePairs(images.length) : renderImagePairs(2)}
        </div>
      </div>
      {isImagePairOpen && (
        <ImageModal
          imagePair={isImagePairOpen}
          onClose={() => setIsImagePairOpen(null)}
        />
      )}
    </>
  );
}
