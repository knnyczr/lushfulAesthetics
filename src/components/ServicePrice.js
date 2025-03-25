import React from "react";
import Button from "./BookBtn";

const ConditionalAnchor = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;

export default function ServicePrice({
  slug,
  intro,
  pricing,
  subheadingOne,
  pricingHeading,
  pricingSlug,
}) {
  return (
    <>
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">
          {subheadingOne || `What Is It For?`}
        </h2>
        <div className="max-w-screen-lg lg:text-lg">{intro}</div>

        <ConditionalAnchor
          condition={!!pricingSlug}
          wrap={(wrappedChildren) => (
            <div id={pricingSlug.substring(1)}>{wrappedChildren}</div>
          )}
        >
          {pricingHeading && (
            <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-6 mt-12">
              {pricingHeading}
            </h3>
          )}
          <div className="mb-6">{pricing}</div>
        </ConditionalAnchor>
        <Button />
      </div>
    </>
  );
}
