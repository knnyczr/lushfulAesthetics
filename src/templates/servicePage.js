import React from "react";
import { graphql } from "gatsby";

const ServicePage = (data) => {
  console.log("here is data from servicePage: ", data);
  return <div>hello world</div>;
};

export default ServicePage;

export const query = graphql`
  query contentfulServicePageQuery {
    allContentfulServicePage(sort: { order: ASC }) {
      edges {
        node {
          contentful_id
          faq {
            raw
          }
          heroImage {
            id
          }
          howDoesItWork {
            raw
          }
          postCare {
            raw
          }
          pricing {
            raw
          }
          preCare {
            raw
          }
          whatsItFor {
            raw
          }
        }
      }
    }
  }
`;
