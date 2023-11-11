import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetWithMetaDesc({ metaTitle, metaDescription }) {
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={`${metaDescription}`}></meta>
    </Helmet>
  );
}
