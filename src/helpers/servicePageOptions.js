import React from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function servicePageOptions(website_url) {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <div className="mb-4">
          <p className="font-serif">{children}</p>
        </div>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="pt-4">{children}</h2>
      ),
      [BLOCKS.HR]: (node) => <hr className="py-2 opacity-0" />,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="ml-4 list-disc">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="ml-10 list-decimal">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="font-serif font-medium h-auto mx-6 my-1">{children}</li>
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
}
