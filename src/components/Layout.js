import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import favicon from "../images/favicon.ico";

export default function Layout({ children }) {
  const [pageTitle, setPageTitle] = useState("Home");
  return (
    <>
      <Helmet title={`Lushful Aesthetics | ${pageTitle}`} />
      {/* <link rel="icon" href={favicon} /> */}
      <Nav setPageTitle={setPageTitle} />
      {children}
      <Footer />
    </>
  );
}
