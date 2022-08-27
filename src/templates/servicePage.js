import React from "react";
import { graphql } from "gatsby";
import { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function ServicePage({ data }) {
  const [pageData, setPageData] = useState(
    data.allContentfulServicePage.edges[0].node
  );
  console.log("here is page data: ", pageData);

  const dynamicImage = useContentfulImage({
    image: {
      url: pageData.heroImage.gatsbyImageData.images.sources[0].srcSet,
      width: 2000,
      height: 1000,
    },
  });

  return (
    <div>
      <GatsbyImage image={dynamicImage} alt="hero image is decorative" />
      <h1>{pageData.serviceTitle}</h1>
      <p>{renderRichText(pageData.faq)}</p>
    </div>
  );
}

export const pageQuery = graphql`
  query servicePageQuery($servicePageSlug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulServicePage(
      filter: { node_locale: { eq: "en-US" }, slug: { eq: $servicePageSlug } }
      limit: 1
    ) {
      edges {
        node {
          slug
          heroImage {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          faq {
            raw
          }
          ourApproach {
            raw
          }
          postCare {
            raw
          }
          preCare {
            raw
          }
          pricing {
            raw
          }
          serviceTitle
        }
      }
    }
  }
`;
