import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function Financing({ data }) {
  const {
    howDoesCherryWork,
    pageTitle,
    reasonsWhyPatientsLoveCherry,
    whatIsCherry,
    heroImage,
  } = data.contentfulFinancingPage;

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
      {data.contentfulFinancingPage && (
        <>
          <GatsbyImage image={dynamicImage} alt={heroImage.description} />
          <h1>{pageTitle}</h1>
          <div>{renderRichText(whatIsCherry)}</div>
          <div>{renderRichText(reasonsWhyPatientsLoveCherry)}</div>
          <div>{renderRichText(howDoesCherryWork)}</div>
        </>
      )}
    </div>
  );
}

export const pageQuery = graphql`
  query financingPageQuery {
    contentfulFinancingPage {
      pageTitle
      reasonsWhyPatientsLoveCherry {
        raw
      }
      whatIsCherry {
        raw
      }
      howDoesCherryWork {
        raw
      }
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
    }
  }
`;
