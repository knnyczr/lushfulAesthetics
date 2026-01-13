import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

/**
 * Safely renders Contentful Rich Text.
 * - Accepts Rich Text objects OR plain strings
 * - Prevents SSR crashes
 */
export function SafeRichText({ field, options }) {
  if (!field) return null;

  // Case 1: Proper Contentful Rich Text object
  if (typeof field === "object" && typeof field.raw === "string") {
    try {
      return <>{renderRichText(field, options)}</>;
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("RichText render failed:", field, err);
      }
      return null;
    }
  }

  // Case 2: Plain string slipped through
  if (typeof field === "string") {
    return <p>{field}</p>;
  }

  // Case 3: Anything unexpected
  return null;
}
