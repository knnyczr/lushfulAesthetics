import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Package from "../components/Package";
import Button from "../components/BookBtn";
import HeroImage from "../components/HeroImage";
import { Helmet } from "react-helmet";

export default function PackagesPage({ data }) {
  const { packagePageTitle, packagesList, heroImage } =
    data.contentfulPackagePage;

  return (
    <>
      <Helmet title={`Lushful Aesthetics | ${packagePageTitle}`} />
      <HeroImage heroImage={heroImage} pageTitle={packagePageTitle} />
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 m-auto p-auto">
        <div className="py-10">
          {packagesList.length &&
            packagesList.map((packageCard, idx) => (
              <div key={idx}>
                <Package packageCard={packageCard} />
              </div>
            ))}
        </div>
        <div className="flex justify-center pt-8 lg:pt-16">
          <Button />
        </div>
      </div>
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
      heroImage {
        gatsbyImageData(layout: CONSTRAINED, quality: 90)
        description
      }
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
