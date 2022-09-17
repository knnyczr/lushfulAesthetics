import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";

export default function HeroImage({ heroImage, pageTitle }) {
<<<<<<< HEAD
  console.log(`Heroimage page:`, heroImage);
  // const dynamicImage = useContentfulImage({
  //   image: {
  //     url:
  //       heroImage.gatsbyImageData.images.sources[0].srcSet ||
  //       heroImage.gatsbyImageData.images.fallback.srcSet,
  //     width: 3000,
  //     height: 800,
  //     // backgroundPosition: "top",
  //   },
  // });
  const image = getImage(heroImage.gatsbyImageData);

  return (
    <>
      <div className="">
        <div className="w-full h-auto">
          <GatsbyImage image={image} alt={heroImage.description} />
        </div>
        <div className="absolute whitespace-nowrap text-xl md:text-3xl lg:text-4xl xl:text-5xl text-main-green font-serif top-60 md:top-80 lg:top-96 xl:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
=======
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
>>>>>>> origin/main
          {pageTitle}
        </div>
      </div>
    </>
  );
}
