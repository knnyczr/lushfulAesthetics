import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function PackagesPage({ data }) {
  const { packagePageTitle, packagesList, description, includesTheseServices } =
    data.contentfulPackagePage;
  return (
    <>
      <h1>{packagePageTitle}</h1>
      {packagesList.length &&
        packagesList.map((packageCard) => (
          <>
            <hr></hr>
            <div>{packageCard.packageTitle}</div>
            <div>{packageCard.packagePrice}</div>
            <div>{renderRichText(packageCard.description)}</div>
            <div>{renderRichText(packageCard.includesTheseServices)}</div>
            <hr></hr>
          </>
        ))}
    </>
  );
}

// 3237edb6-b38c-54d8-b619-040f5e72a0f1
// aesthetic-services/facial-treatments/facial-packages

export const pageQuery = graphql`
  query packagePageQuery($packagePageId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPackagePage(id: { eq: $packagePageId }) {
      packagePageTitle
      packagesList {
        packagePrice
        packageTitle
        description {
          raw
        }
        includesTheseServices {
          raw
        }
      }
    }
  }
`;
