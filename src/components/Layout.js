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
      <meta httpEquiv="content-language" content="en-us" />
      {process.env.NODE_ENV === "production" && (
        <>
          <meta
            name="facebook-domain-verification"
            content="lih9j34woa8ztip98myvop39w9zcy6"
          />

          <script
            src="https://js.adsrvr.org/up_loader.1.1.0.js"
            type="text/javascript"
          />
          <script type="text/javascript">
            {`
              ttd_dom_ready( 
                function() { 
                  if (typeof TTDUniversalPixelApi === 'function') { 
                    var universalPixelApi = new TTDUniversalPixelApi(); universalPixelApi.init("t2f05ni", ["yekzz77"], "https://insight.adsrvr.org/track/up");
                  } 
                }
              )
            `}
          </script>
        </>
      )}
      {children}
    </>
  );
}
