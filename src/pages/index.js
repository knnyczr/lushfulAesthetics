import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import Map from "../components/Map";
import ReviewComponent from "../components/ReviewComponent";

export default function IndexPage({ data }) {
  const {
    slogan,
    visionStatement,
    address,
    googleLocation,
    reviews,
    heroImage,
  } = data.contentfulHomePage;

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 2000,
      height: 1000,
    },
  });

  console.log("reviews: ", reviews);
  console.log("here is google location: ", googleLocation);

  return (
    <div>
      <GatsbyImage image={dynamicImage} alt={heroImage.description} />

      <div class="font-serif  md:font-extrabold">{slogan}</div>
      <div>{visionStatement}</div>
      <div>{renderRichText(address)}</div>
      <Map coordinates={googleLocation} />
      <div>
        <ReviewComponent reviews={reviews} />
        {/* {reviews.map((review, index) => (
          <li key={index}>{review.reviewerName}</li>
        ))} */}
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
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH)
      }
      address {
        raw
      }
      googleLocation {
        lat
        lon
      }
      reviews {
        review
        reviewerName
        reviewerAge
        reviewerLocation
        fromPackage
      }
    }
  }
`;
