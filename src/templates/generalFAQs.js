import { graphql } from "gatsby";
import React from "react";

export default function GeneralFAQs({ data }) {
  console.log(data);
  return (
    <>
      <h1>General FAQs</h1>
    </>
  );
}

export const pageQuery = graphql`
  query GeneralFAQsQuery($pageId: String!) {
    allContentfulGeneralFaqPage(limit: 1, filter: { id: { eq: $pageId } }) {
      edges {
        node {
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
