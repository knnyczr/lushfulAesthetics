import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function HIPAAPolicy({
  data: { allContentfulHipaaPolicyPage },
}) {
  const website_url = "https://www.lushfulaesthetics.com/";

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={`${"font-serif"}`}>{children}</p>
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
        allContentfulHipaaPolicyPage.edges[0].node.content,
        options
      )}
    </>
  );
}

export const pageQuery = graphql`
  query HipaaPolicyQuery($pageId: String!) {
    allContentfulHipaaPolicyPage(limit: 1, filter: { id: { eq: $pageId } }) {
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
