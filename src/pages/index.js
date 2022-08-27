import * as React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function IndexPage({ data }) {
  console.log(data);
  const {
    slogan,
    visionStatement,
    address,
    googlelocation,
    childrenContentfulHomePageReviewsJsonNode,
  } = data.contentfulHomePage;
  return (
    <div>
      <div>{slogan}</div>
      <div>{visionStatement}</div>
      <div>{renderRichText(address)}</div>
      <div>{googlelocation.lat}</div>
      <div>{googlelocation.lon}</div>
      <div>
        {childrenContentfulHomePageReviewsJsonNode[0].reviews.map((review) => (
          <li>{review.name}</li>
        ))}
      </div>
    </div>
  );
}

export const query = graphql`
  # query will go here
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    contentfulHomePage {
      slogan
      visionStatement
      address {
        raw
      }
      googlelocation {
        lat
        lon
      }
      childrenContentfulHomePageReviewsJsonNode {
        reviews {
          age
          location
          name
          package
          review
        }
      }
    }
  }
`;
