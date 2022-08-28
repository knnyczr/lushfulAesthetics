import * as React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function IndexPage({ data }) {
  console.log(data);
  const {
    slogan,
    visionStatement,
    address,
    googleLocation,
    childrenContentfulHomePageReviewsJsonNode,
  } = data.contentfulHomePage;
  let reviews = childrenContentfulHomePageReviewsJsonNode[0].reviews;
  return (
    <div>
      <div>{slogan}</div>
      <div>{visionStatement}</div>
      <div>{renderRichText(address)}</div>
      <div>{googleLocation.lat}</div>
      <div>{googleLocation.lon}</div>
      <div>
        {reviews.map((review) => (
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
      googleLocation {
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
