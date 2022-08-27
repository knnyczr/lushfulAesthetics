import { graphql } from "gatsby";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function AboutUs({ data }) {
  console.log(data);
  const { aboutLushfulAesthetics, meetInjectorChris } = data.contentfulAboutUs;
  return (
    <div>
      {data?.contentfulAboutUs ? (
        <>
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
      aboutLushfulAesthetics {
        raw
      }
      meetInjectorChris {
        raw
      }
    }
  }
`;
