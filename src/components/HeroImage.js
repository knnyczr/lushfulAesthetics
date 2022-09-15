import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";

export default function HeroImage({ heroImage, pageTitle }) {
  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 3000,
      height: 1000,
      backgroundPosition: "top",
    },
  });

  return (
    <>
      <div className="relative">
        <GatsbyImage image={dynamicImage} alt={heroImage.description} />
        <div className="absolute whitespace-nowrap text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-serif top-20 md:top-40 xl:top-80 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {pageTitle}
        </div>
      </div>
    </>
  );
}
