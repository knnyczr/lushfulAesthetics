import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import HeroImage from "../components/HeroImage";
import ApplyBtn from "../components/ApplyBtn";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";

export { Head } from "../components/Layout";

export default function Financing({ data }) {
  const {
    howDoesCherryWork,
    pageTitle,
    reasonsWhyPatientsLoveCherry,
    heroImage,
    applyForCherryLink,
    applyForPatientFiLink,
    metaDescription,
    metaTitle,
    financingIntro,
    howDoesPatientFiWork,
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
        <li className="py-8 px-4 my-2 h-auto align-middle md:py-10 md:px-8 md:h-auto bg-white mx-2 rounded md:w-1/4 text-center font-serif font-medium">
          {children}
        </li>
      ),
    },
  };

  const howDoesItworkOptions = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg pt-6">
          <br />
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="flex flex-col justify-center list-disc ml-5">
          {children}
        </ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="text">{children}</li>
      ),
    },
  };

  return (
    <div>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      {data.contentfulFinancingPage && (
        <>
          <HeroImage heroImage={heroImage} pageTitle={pageTitle} />

          <div>
            <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center md:items-center ">
              <div className="max-w-screen-lg pb-8 lg:pb-16 text-lg lg:text-2xl text-center">
                {renderRichText(financingIntro)}
              </div>
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8 justify-center mx-auto w-2/3">
                <ApplyBtn url={applyForCherryLink} text={"Apply with cherry"} />
                <ApplyBtn
                  url={applyForPatientFiLink}
                  text={"Apply with PatientFi"}
                />
              </div>
            </div>
            <div className="bg-main-green w-screen px-4 py-16 sm:px-6 d:px-12 lg:px-24 flex flex-col justify-center items-center last:mt-10">
              <h4 className="text-white pb-8 uppercase text-lg font-semibold">
                REASONS WHY PATIENTS LOVE financing with us
              </h4>
              {renderRichText(reasonsWhyPatientsLoveCherry, options)}
            </div>

            <div className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 2xl:px-0 flex flex-col lg:flex-row mx-auto justify-center gap-8  max-w-[1536px] h-full">
              <div className="flex justify-start items-start border border-black">
                <div className="max-w-screen-lg py-8 px-6 lg:py-12 lg:px-12">
                  <h4 className="capitalize font-serif font-bold text-2xl pb-4 lg:pb-8 lg:text-3xl">
                    How does cherry work
                  </h4>
                  <hr className=" border-black" />
                  <div className="pt-4 lg:pt-8 lg:text-lg [&>*]:mb-6 nth-child-2:mb-0">
                    {renderRichText(howDoesCherryWork, howDoesItworkOptions)}
                  </div>
                  <div>
                    <ApplyBtn
                      url={applyForCherryLink}
                      text={"Apply with cherry"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start border border-black ">
                <div className="max-w-screen-lg py-8 px-6 lg:py-12 lg:px-12">
                  <h4 className="capitalize font-serif font-bold text-2xl pb-4 lg:pb-8 lg:text-3xl">
                    How does PatientFi work
                  </h4>
                  <hr className=" border-black" />
                  <div className="pt-4 lg:pt-8 lg:text-lg [&>*]:mb-6 nth-child-2:mb-0">
                    {renderRichText(howDoesPatientFiWork, howDoesItworkOptions)}
                  </div>
                  <div className="">
                    <ApplyBtn
                      url={applyForPatientFiLink}
                      text={"Apply with PatientFi"}
                    />
                  </div>
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
      metaTitle
      metaDescription
      applyForPatientFiLink
      applyForCherryLink
      pageTitle
      financingIntro {
        raw
      }
      reasonsWhyPatientsLoveCherry {
        raw
      }
      whatIsCherry {
        raw
      }
      howDoesCherryWork {
        raw
      }
      howDoesPatientFiWork {
        raw
      }
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        description
      }
    }
  }
`;
