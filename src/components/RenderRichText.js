import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function RenderRichTextComponent(richText, string) {
  if (!richText) return;
  const website_url = "https://www.lushfulaesthetics.com/";
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p
          className={`${
            string && string === "pricing" ? "font-sans" : "font-serif"
          }`}
        >
          {children}
        </p>
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
          {console.log("-------HERE IS DATA: ", data)}
          {children}
        </a>
      ),
    },
  };
  return renderRichText(richText, options);
}
