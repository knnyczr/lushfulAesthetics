import { graphql } from "gatsby";
import React from "react";
import HeroImage from "../components/HeroImage";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";

import { BLOCKS } from "@contentful/rich-text-types";

export default function AboutUs({ data }) {
  const { aboutLushfulAesthetics, meetInjectorChris, heroImage, portrait } =
    data.contentfulAboutUs;

  let image = getImage(portrait);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-5">{children}</p>
      ),
    },
  };
  return (
    <div>
      <Helmet title={`Lushful Aesthetics | About`} />
      {data.contentfulAboutUs ? (
        <>
          <HeroImage
            heroImage={heroImage}
            pageTitle={`Where Lifestyle Meets Beauty`}
          />

          <div className="mt-6 px-4 sm:px-6 md:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center bg-main-green">
            <h2 className="pb-8 text-xl font-semibold font-serif">{`About Lushful Aesthetics`}</h2>
            <div className="max-w-screen-lg pb-8 lg:pb-16 lg:text-lg md:text-center">
              {renderRichText(aboutLushfulAesthetics)}
            </div>
          </div>

          <div className="flex flex-col lg:justify-center lg:flex-row min-h-fit ">
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 lg:py-24 w-full lg:w-2/3 flex flex-col">
              <h3 className="font-serif font-semibold text-2xl lg:text-3xl mb-10">
                Meet InjectorChris
              </h3>
              <div className="max-w-screen-lg pb-2 w-full lg:pb-16 lg:text-lg justify-center items-start ">
                {renderRichText(meetInjectorChris, options)}
              </div>
            </div>
            <div className="pb-8 h-auto w-min-max lg:w-96 mx-4 my-4  md:mr-12 md:mt-12 lg:mr-24 lg:mt-24">
              <GatsbyImage image={image} />
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
        gatsbyImageData(
          quality: 100
          width: 100
          height: 50
          layout: FULL_WIDTH
          cropFocus: TOP
          resizingBehavior: FILL
        )
        description
      }
      aboutLushfulAesthetics {
        raw
      }
      meetInjectorChris {
        raw
      }
      portrait {
        gatsbyImageData(layout: CONSTRAINED, quality: 90)
      }
    }
  }
`;
