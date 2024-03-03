import { graphql, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import servicePageOptions from "../helpers/servicePageOptions";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export default function AcceptDataDisclosure({ setUser }) {
  const {
    contentfulFooterContent: { dataCaptureDisclosure },
  } = useStaticQuery(graphql`
    query DataCaptureDisclosureQuery {
      contentfulFooterContent {
        dataCaptureDisclosure {
          raw
        }
      }
    }
  `);
  const website_url = useSiteMetadata().siteUrl;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="font-sans">{children}</p>
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
    <div className="fixed inset-x-0 bottom-10 flex justify-center mx-auto">
      <div className="w-full max-w-[1536px] flex justify-center mx-auto">
        <div
          style={{
            boxShadow: `0px 4px 20px 6px rgba(0, 0, 0, 0.15)`,
          }}
          className="2xl:w-full w-11/12 bg-white rounded-md pt-6 pb-4 px-6 md:px-16 md:py-6 flex flex-col md:flex-row items-center"
        >
          <div className="text-xs flex mb-4 md:mb-0">
            {renderRichText(dataCaptureDisclosure, options)}
          </div>
          <div className="w-full text-center md:text-left md:w-3/5 md:ml-5">
            <button
              onClick={() => setUser(true)}
              className="py-3 px-6 w-full text-sm text-bold md:mt-0 md:text-base bg-main-green hover:bg-main-green-shade text-white uppercase whitespace-nowrap rounded"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
