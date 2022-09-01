import { graphql } from "gatsby";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import HeroImage from "../components/HeroImage";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function AboutUs({ data }) {
  const { aboutLushfulAesthetics, meetInjectorChris, heroImage } =
    data.contentfulAboutUs;

  // console.log(data);
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
          <HeroImage heroImage={heroImage} />
          <h1>{`About Lushful Aesthetics`}</h1>
          <div>{renderRichText(aboutLushfulAesthetics)}</div>
          <div>{renderRichText(meetInjectorChris)}</div>
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
