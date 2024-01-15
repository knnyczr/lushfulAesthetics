import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import AcceptCookiePopover from "./AcceptCookieBanner";

export default function Layout({ children }) {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  return (
    <>
      <Nav />
      {children}
      {!hasAcceptedCookies && (
        <AcceptCookiePopover setHasAcceptedCookies={setHasAcceptedCookies} />
      )}
      <Footer />
    </>
  );
}

export function Head({ children }) {
  return (
    <>
      <meta
        name="facebook-domain-verification"
        content="lih9j34woa8ztip98myvop39w9zcy6"
      />

      <meta httpEquiv="content-language" content="en-us" />
      {children}
    </>
  );
}
