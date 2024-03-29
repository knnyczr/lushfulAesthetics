import { graphql } from "gatsby";
import React from "react";
import CustomAccordion from "../components/CustomAccodian";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";

export { Head } from "../components/Layout";

export default function GeneralFAQs({ data }) {
  const { faqList, metaTitle, metaDescription } =
    data.allContentfulGeneralFaqPage.edges[0].node;

  return (
    <>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <div className="px-4 py-16 sm:px-6 lg:px-24 lg:py-12 xl:py-12">
        <div className="mb-10 px-4  sm:px-6 lg:px-24 container font-serif font-bold text-3xl ">
          <h1>General FAQs</h1>
        </div>

        <div className="mt-4 px-4  sm:px-6 lg:px-24 ">
          {faqList.map((faq, idx) => (
            <CustomAccordion
              key={idx}
              index={idx}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query GeneralFAQsQuery($pageId: String!) {
    allContentfulGeneralFaqPage(limit: 1, filter: { id: { eq: $pageId } }) {
      edges {
        node {
          metaDescription
          metaTitle
          faqList {
            question
            answer {
              raw
            }
          }
        }
      }
    }
  }
`;
