import { graphql } from "gatsby";
import React from "react";
import HeroImage from "../components/HeroImage";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function AboutUs({ data }) {
  const { aboutLushfulAesthetics, meetInjectorChris, heroImage } =
    data.contentfulAboutUs;

  return (
    <div>
      {data.contentfulAboutUs ? (
        <>
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
