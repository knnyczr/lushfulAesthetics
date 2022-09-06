import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import HeroImage from "../components/HeroImage";
import ApplyCherryBtn from "../components/ApplyCherryBtn";

export default function Financing({ data }) {
  const {
    howDoesCherryWork,
    pageTitle,
    reasonsWhyPatientsLoveCherry,
    whatIsCherry,
    heroImage,
  } = data.contentfulFinancingPage;

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 2000,
      height: 1000,
    },
  });

  // console.log(
  //   "here is this: ",
  //   renderRichText(reasonsWhyPatientsLoveCherry)[0].props.children
  // );

  return (
    <div>
      {data.contentfulFinancingPage && (
        <>
          <HeroImage heroImage={heroImage} pageTitle={pageTitle} />

          <div>
            <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center md:items-center ">
              <div className="max-w-screen-lg pb-8 lg:pb-16 text-lg lg:text-2xl md:text-center">
                {renderRichText(whatIsCherry)}
              </div>
              <div>
                <ApplyCherryBtn />
              </div>
            </div>
            <div className="bg-main-green w-screen px-4 py-16 sm:px-6 d:px-12 lg:px-24 flex flex-col justify-center items-center">
              <h4 className="text-white pb-8 uppercase text-lg font-semibold">
                3 Reasons Why Patients Love Cherry
              </h4>
              <div className="flex flex-col md:flex-row justify-center">
                {renderRichText(
                  reasonsWhyPatientsLoveCherry
                )[0].props.children.map((prop, index) => {
                  return (
                    <div
                      className="py-8 px-4 my-2 h-auto align-middle md:py-10 md:px-8 md:h-auto bg-white mx-2 rounded md:w-1/4 text-center font-serif font-medium"
                      key={index}
                    >
                      {prop.props.children[0].props.children[0]}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* not sure how to seperate the data from above */}

            <div className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center ">
              <div className="max-w-screen-lg border border-black py-8 px-6 lg:py-12 lg:px-12">
                <h4 className="capitalize font-serif font-bold text-2xl pb-4 lg:pb-8 lg:text-3xl">
                  How does cherry work
                </h4>
                <hr className=" border-black" />
                <div className="pt-4 lg:pt-8 lg:text-lg">
                  {renderRichText(howDoesCherryWork)}
                </div>
                <div className="pt-8 lg:pt-16">
                  <ApplyCherryBtn />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const pageQuery = graphql`
  query financingPageQuery {
    contentfulFinancingPage {
      pageTitle
      reasonsWhyPatientsLoveCherry {
        raw
      }
      whatIsCherry {
        raw
      }
      howDoesCherryWork {
        raw
      }
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
    }
  }
`;
