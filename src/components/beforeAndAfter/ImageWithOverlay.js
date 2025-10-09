import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

export default function ImageWithOverlay({
  src,
  alt,
  overlayText,
  type,
  shouldBlur,
}) {
  const overlayClass =
    type === "Before" ? "justify-end pr-6" : "justify-start pl-6";

  const local = src?.localFile?.childImageSharp?.gatsbyImageData;
  const remote = src?.gatsbyImageData;
  const image = getImage(local || remote);

  return (
    <div className="relative w-1/2">
      {image && <GatsbyImage image={image} alt={alt} />}
      <div
        className={`absolute w-full h-full top-0 left-0 flex items-end ${overlayClass} text-white font-medium pb-6 ${
          shouldBlur
            ? "backdrop-blur-2xl"
            : "bg-gradient-to-t from-black/50 to-transparent"
        } `}
      >
        {overlayText}
      </div>
    </div>
  );
}
