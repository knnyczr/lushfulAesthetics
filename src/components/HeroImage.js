import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function HeroImage({ heroImage, pageTitle }) {
  const image = getImage(heroImage.gatsbyImageData);

  return (
    <>
      <div className="relative flex justify-between items-center mx-auto max-w-[1536px] ">
        {heroImage && (
          <GatsbyImage
            image={image}
            alt={heroImage.description}
            // imgStyle={{ backgroundPositionY: "top" }}
            // style={{ height: "500px" }}
            className="w-full object-contain h-[400px] lg:h-auto lg:aspect-[19/9] lg:max-h-[800px]"
          />
        )}

        <h1 className="absolute mx-4 sm:mx-6 lg:mx-24 bottom-0 px-16 pt-4 text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold bg-white">
          {pageTitle}
        </h1>
      </div>
    </>
  );
}
