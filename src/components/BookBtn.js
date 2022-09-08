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
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white uppercase "
          type="button"
        >
          Book Now
        </button>
      </a>
    </>
  );
}
