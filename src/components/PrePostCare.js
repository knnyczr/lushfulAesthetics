import React from "react";
import { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function PrePostCare({ preCare, postCare, heroImage }) {
  const [pre, setPre] = useState(true);

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 3000,
      height: 3000,
      backgroundPosition: "top",
    },
  });

  const website_url = "https://www.lushfulaesthetics.com/";

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="list-outside	list-none">{children}</ul>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="border-black mb-3">{children}</li>
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-main-green">
        <div className="lg:w-7/12 px-4 py-16 sm:px-6 lg:px-24 lg:py-8 xl:py-12 flex flex-col justify-start md:justify-center">
          <div>
            <span
              onClick={() => setPre(true)}
              className={`hover:cursor-pointer text-white text-3xl font-serif font-bold  ${
                pre ? "text-white underline" : "text-black"
              }`}
            >
              Pre-Care
            </span>
            <span className="text-3xl font-serif font-bold text-white">{` | `}</span>
            <span
              onClick={() => setPre(false)}
              className={`hover:cursor-pointer  text-3xl font-serif font-bold text-white ${
                !pre ? "text-white underline" : "text-black"
              }`}
            >
              Post-Care
            </span>
          </div>

          <div className="my-4 text-white text-md">
            {pre
              ? renderRichText(preCare, options)
              : renderRichText(postCare, options)}
          </div>
        </div>

        <div className="lg:w-5/12 hidden lg:flex lg:justify-end overflow-hidden max-h-96">
          <GatsbyImage image={dynamicImage} alt={`styling image`} />
        </div>
      </div>
    </>
  );
}
