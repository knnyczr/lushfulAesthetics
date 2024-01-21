import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetWithMetaDesc({ metaTitle, metaDescription }) {
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={`${metaDescription}`}></meta>
      <script
        src="https://js.adsrvr.org/up_loader.1.1.0.js"
        type="text/javascript"
      />
      <script type="text/javascript">
        {`
          ttd_dom_ready( 
            function() { 
              if (typeof window !== "undefined" && typeof TTDUniversalPixelApi === "function") { 
                var universalPixelApi = new TTDUniversalPixelApi(); universalPixelApi.init("t2f05ni", ["yekzz77"], "https://insight.adsrvr.org/track/up");
              } 
            }
          )
        `}
      </script>
    </Helmet>
  );
}
