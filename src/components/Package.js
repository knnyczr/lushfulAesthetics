import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Button from "./BookBtn";

export default function Package({ packageCard }) {
  console.log(`packgeCard`, packageCard);
  return (
    <>
      <div className="py-2 max-w-6xl m-auto p-auto">
        <div className="bg-main-green px-12 py-8 rounded-lg">
          <div className="flex flex-row justify-between items-baseline">
            <h2 className="font-serif font-bold text-2xl">
              {packageCard.packageTitle}
            </h2>
            <h2 className="font-serif font-bold text-lg">
              {packageCard.packagePrice}
            </h2>
          </div>
          <hr className="my-4 border-black" />
          <div className="font-serif font-bold ">
            {renderRichText(packageCard.description)}
          </div>
          <div className="ml-8 mt-8 font-sans font-light">
            {renderRichText(packageCard.includesTheseServices)}
          </div>
        </div>
      </div>
    </>
  );
}
