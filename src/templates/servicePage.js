import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function ServicePage({ data }) {
  const {
    serviceTitle,
    faq,
    pricing,
    heroImage,
    ourApproach,
    preCare,
    postCare,
  } = data.allContentfulServicePage.edges[0].node;

  // console.log(
  //   "here is page data: ",
  //   data.allContentfulServicePage.edges[0].node
  // );

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 2000,
      height: 1000,
    },
  });

  // TODO: renderRichText article: https://www.gatsbyjs.com/blog/how-to-use-the-contentful-rich-text-field-with-gatsby/
  return (
    <div>
      {data?.allContentfulServicePage?.edges?.length && (
        <>
          <GatsbyImage image={dynamicImage} alt={heroImage.description} />
          <h1>{serviceTitle}</h1>
          <h2>{`What Is It For?`}</h2>
          <div>{renderRichText(pricing)}</div>
          <div>{renderRichText(ourApproach)}</div>
          <div>{renderRichText(preCare)}</div>
          <div>{renderRichText(postCare)}</div>
          <div>{renderRichText(faq)}</div>
        </>
      )}
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
            description
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
