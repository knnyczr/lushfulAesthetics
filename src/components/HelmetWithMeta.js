import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { Helmet } from "react-helmet";

export default function HelmetWithMetaDesc({
  metaTitle,
  pageTitle,
  metaDescription,
}) {
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={`${metaDescription}`}></meta>
    </Helmet>
  );
}
