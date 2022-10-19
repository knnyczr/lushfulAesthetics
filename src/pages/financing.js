import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import HeroImage from "../components/HeroImage";
import ApplyCherryBtn from "../components/ApplyCherryBtn";
import { Helmet } from "react-helmet";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function Financing({ data }) {
  const {
    howDoesCherryWork,
    pageTitle,
    reasonsWhyPatientsLoveCherry,
    whatIsCherry,
    heroImage,
    applyForCherryLink,
  } = data.contentfulFinancingPage;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg pt-6">
          <br />
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="flex flex-col md:flex-row justify-center">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="py-8 px-4 my-2 h-auto align-middle md:py-10 md:px-8 md:h-auto bg-white mx-2 rounded md:w-1/4 text-center font-serif font-medium ">
          {children}
        </li>
      ),
    },
  };

  console.log(data);
  return (
    <div>
      <Helmet title={`Lushful Aesthetics | Financing With Cherry`} />
      {data.contentfulFinancingPage && (
        <>
          <HeroImage heroImage={heroImage} pageTitle={pageTitle} />

          <div>
            <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center md:items-center ">
              <div className="max-w-screen-lg pb-8 lg:pb-16 text-lg lg:text-2xl md:text-center">
                {renderRichText(whatIsCherry)}
              </div>
              <div>
                <ApplyCherryBtn url={applyForCherryLink} />
              </div>
            </div>
            <div className="bg-main-green w-screen px-4 py-16 sm:px-6 d:px-12 lg:px-24 flex flex-col justify-center items-center last:mt-10">
              <h4 className="text-white pb-8 uppercase text-lg font-semibold">
                3 Reasons Why Patients Love Cherry
              </h4>
              {renderRichText(reasonsWhyPatientsLoveCherry, options)}
            </div>

            <div className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center ">
              <div className="max-w-screen-lg border border-black py-8 px-6 lg:py-12 lg:px-12">
                <h4 className="capitalize font-serif font-bold text-2xl pb-4 lg:pb-8 lg:text-3xl">
                  How does cherry work
                </h4>
                <hr className=" border-black" />
                <div className="pt-4 lg:pt-8 lg:text-lg [&>*]:mb-6 nth-child-2:mb-0">
                  {renderRichText(howDoesCherryWork)}
                </div>
                <div className="">
                  <ApplyCherryBtn url={applyForCherryLink} />
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
      applyForCherryLink
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
        gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        description
      }
    }
  }
`;
