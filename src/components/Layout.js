import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Layout({ children }) {
  const [pageTitle, setPageTitle] = useState("Home");
  return (
    <>
      <Helmet title={`Lushful Aesthetics | ${pageTitle}`} />
      <Nav setPageTitle={setPageTitle} />
      {children}
      <Footer />
    </>
  );
}
