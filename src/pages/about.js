import { graphql } from "gatsby";
import React from "react";
import HeroImage from "../components/HeroImage";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function AboutUs({ data }) {
  const { aboutLushfulAesthetics, meetInjectorChris, heroImage } =
    data.contentfulAboutUs;

  console.log(data);
  // const dynamicImage = useContentfulImage({
  //   image: {
  //     url:
  //       heroImage.gatsbyImageData.images.sources[0].srcSet ||
  //       heroImage.gatsbyImageData.images.fallback.srcSet,
  //     width: 2000,
  //     height: 1000,
  //   },
  // });

  return (
    <div>
      {data.contentfulAboutUs ? (
        <>
          {/* <GatsbyImage image={dynamicImage} alt={heroImage.description} /> */}
          <div className="relative">
            <HeroImage heroImage={heroImage} />
            <h2 className="absolute whitespace-nowrap capitalize text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-serif text-red top-20 md:top-40 xl:top-80 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Where lifestyle meets beauty
            </h2>
          </div>

          <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center bg-main-green">
            <h2 className="pb-8 uppercase text-xl font-semibold">{`About Lushful Aesthetics`}</h2>
            <div className="max-w-screen-lg pb-8 lg:pb-16 lg:text-lg md:text-center">
              {renderRichText(aboutLushfulAesthetics)}
            </div>
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 lg:py-24 flex flex-col">
              <h3 className="font-serif font-semibold text-2xl lg:text-3xl mb-10">
                Meet InjectorChris
              </h3>
              <div className="max-w-screen-lg pb-8 lg:pb-16 lg:text-lg justify-center items-start ">
                {renderRichText(meetInjectorChris)}
              </div>
            </div>
            <div className="h-96 w-96 bg-slate-400 ml-4 mb-16 sm:ml-6 sm:mb-6 md:mr-12 md:mt-12 lg:mr-24 lg:mt-24">
              Here need a photo of Chris
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export const pageQuery = graphql`
  query aboutUsQuery {
    contentfulAboutUs {
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
      aboutLushfulAesthetics {
        raw
      }
      meetInjectorChris {
        raw
      }
    }
  }
`;
