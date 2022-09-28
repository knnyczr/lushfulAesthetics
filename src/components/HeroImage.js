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
        />

        <h3 className="absolute mx-4 sm:mx-6 lg:mx-24 bottom-0 px-16 pt-4 text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold bg-white">
          {pageTitle}
        </h3>
      </div>
    </>
  );
}
