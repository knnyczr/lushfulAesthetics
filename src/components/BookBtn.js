import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function Button() {
  const {
    contentfulBookNowLink: { bookNowLink },
  } = useStaticQuery(graphql`
    query BookNowQuery {
      contentfulBookNowLink {
        bookNowLink
      }
    }
  `);

  return (
    <>
      <a href={bookNowLink} target="_blank" rel="noreferrer">
        <button
          className="py-3 px-6 text-sm text-bold md:text-base bg-main-green hover:bg-main-green-shade rounded text-white uppercase whitespace-nowrap "
          type="button"
        >
          Book Now
        </button>
      </a>
    </>
  );
}
