import React from "react";
import { graphql } from "gatsby";
import TrainingCard from "../components/TrainingCard";
import HeroImage from "../components/HeroImage";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";

export { Head } from "../components/Layout";

export default function Training({ data }) {
  const {
    trainingPageTitle,
    trainingsList,
    metaDescription,
    metaTitle,
    heroImage,
    registerLink,
  } = data.contentfulTrainingPage;
  return (
    <>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <HeroImage heroImage={heroImage} pageTitle={trainingPageTitle} />
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 lg:py-24 m-auto p-auto">
        <div className="py-10">
          {trainingsList.length &&
            trainingsList.map((trainingCard, idx) => (
              <div key={idx}>
                <TrainingCard trainingCard={trainingCard} />
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-8 lg:mt-16">
          <a href={registerLink} target="_blank" rel="noreferrer">
            <button
              className="py-3 px-6 text-sm text-bold md:text-base bg-main-green hover:bg-main-green-shade rounded text-white uppercase whitespace-nowrap "
              type="button"
            >
              Register Now
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query trainingPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulTrainingPage {
      trainingPageTitle
      metaDescription
      metaTitle
      registerLink
      trainingsList {
        trainingTitle
        trainingPrice
        description {
          raw
        }
        includesTheseTrainings {
          raw
        }
      }
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        description
      }
    }
  }
`;
