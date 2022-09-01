import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";

export default function HeroImage({ heroImage, pageTitle }) {
  //   console.log("here is props", heroImage, pageTitle);

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
      <div>
        <GatsbyImage image={dynamicImage} alt={heroImage.description} />
        <h1 className="absolute whitespace-nowrap text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-serif text-red top-40 md:top-60 xl:top-80 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {pageTitle}
        </h1>
      </div>
    </>
  );
}
