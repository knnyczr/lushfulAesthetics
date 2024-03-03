import React from "react";
import { Helmet } from "react-helmet";

const isBrowser = typeof window !== `undefined`;

export default function HelmetWithMetaDesc({ metaTitle, metaDescription }) {
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={`${metaDescription}`}></meta>
    </Helmet>
  );
}
