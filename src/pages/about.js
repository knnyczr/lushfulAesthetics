import { graphql } from "gatsby";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function AboutUs({ data }) {
  const { aboutLushfulAesthetics, meetInjectorChris, heroImage } =
    data.contentfulAboutUs;

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 2000,
      height: 1000,
    },
  });

  return (
    <div>
      {data.contentfulAboutUs ? (
        <>
          <h1>{`About Lushful Aesthetics`}</h1>
          <GatsbyImage image={dynamicImage} alt={heroImage.description} />
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
