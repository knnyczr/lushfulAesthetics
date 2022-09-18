import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";

export default function HeroImage({ heroImage, pageTitle }) {
  const image = getImage(heroImage.gatsbyImageData);

  return (
    <>
      <div className="relative">
        <GatsbyImage
          image={image}
          alt={heroImage.description}
          imgStyle={{ backgroundPositionY: "top" }}
          style={{ height: "500px" }}
          // I'm not sure how to change the background position of the image
          // But 500px looks good on both mobile and desktop so far
        />

        <h3 className="absolute left-1/2 text-4xl text-center md:text-5xl lg:text-6xl text-white font-serif font-semibold top-60 -translate-x-1/2 -translate-y-1/2">
          {pageTitle}
        </h3>
      </div>
    </>
  );
}
