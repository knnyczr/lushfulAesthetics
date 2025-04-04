import React, { useEffect, useState, useRef, useCallback } from "react";

import { Link } from "gatsby";
import { useLocation } from "@reach/router";

export default function AnchorLinkComponent({ children, slug, pricingSlug }) {
  const location = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const anchorRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    setAnchorElement(anchorRef);
  }, []);

  const delayScroll = (func) => {
    setTimeout(func, 2000);
  };

  const scrollToAnchor = useCallback(() => {
    setHasScrolled(true);
    const yOffset =
      anchorElement.current.getBoundingClientRect().top + window.scrollY - 150;

    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }, [anchorElement]);

  useEffect(() => {
    if (anchorElement && !hasScrolled && location.hash) {
      delayScroll(scrollToAnchor());
    }
  }, [anchorElement, location, hasScrolled, scrollToAnchor]);

  return (
    <Link
      ref={anchorRef}
      onClick={(e) => {
        if (e.type === "click") {
          e.preventDefault();
          window.history.pushState({}, "", `#${pricingSlug.substring(1)}`);
          delayScroll(scrollToAnchor());
        }
      }}
      to={`/${slug}/${pricingSlug}`}
      id={pricingSlug.substring(1)}
    >
      {children}
    </Link>
  );
}
