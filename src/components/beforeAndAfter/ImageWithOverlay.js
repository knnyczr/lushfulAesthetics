import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import React from "react";

export default function ImageWithOverlay({
  src,
  alt,
  overlayText,
  type,
  shouldVerifyAge,
}) {
  const overlayClass =
    type === "Before" ? "justify-end pr-6" : "justify-start pl-6";

  const dynamicImage = useContentfulImage({
    image: {
      url:
        src.gatsbyImageData.images.sources[0].srcSet ||
        src.gatsbyImageData.images.fallback.srcSet,
      width: 3000,
      height: 3000,
      backgroundPosition: "top",
    },
  });

  return (
    <div className="">
      <GatsbyImage image={dynamicImage} alt={alt} />
      <div
        className={`absolute w-full h-full top-0 left-0 flex items-end ${overlayClass} text-white font-medium pb-6 bg-gradient-to-t from-black/50 to-transparent`}
      >
        {overlayText}
      </div>
    </div>
  );
}
