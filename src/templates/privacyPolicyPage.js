import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function PrivacyPolicy({ data }) {
  const website_url = "https://www.lushfulaesthetics.com/";

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="font-serif">{children}</p>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <li className="font-sans text-main-green">{children}</li>
      ),
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
          className="underline "
          href={data.uri ? data.uri : ""}
          target={`${
            data.uri.startsWith(website_url || "http://localhost:8000/")
              ? "_self"
              : "_blank"
          }`}
          rel={`${
            data.uri.startsWith(website_url) ? "" : "noopener noreferrer"
          }`}
        >
          {children}
        </a>
      ),
    },
  };
  return (
    <>
      {renderRichText(
        data.allContentfulPrivacyPolicyPage.edges[0].node.content,
        options
      )}
    </>
  );
}

export const pageQuery = graphql`
  query PrivacyPolicyQuery($pageId: String!) {
    allContentfulPrivacyPolicyPage(limit: 1, filter: { id: { eq: $pageId } }) {
      edges {
        node {
          content {
            raw
          }
        }
      }
    }
  }
`;
