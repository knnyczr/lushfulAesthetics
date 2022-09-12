import React from "react";
import { useState } from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function CustomAccordion({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="text-black">
      <div className="container py-1 mx-auto">
        <div className="flex flex-wrap ">
          <div className="w-full py-2">
            <details className="mb-2">
              <summary
                onClick={() => setOpen(!open)}
                className="font-semibold text-lg font-serif rounded-md list-none cursor-pointer flex justify-between"
              >
                <div>{question}</div>
                <div>
                  {open ? (
                    <span className="font-bold text-lg">-</span>
                  ) : (
                    <span className="font-bold text-lg">+</span>
                  )}
                </div>
              </summary>
              <span>
                <div className="mt-6 px-6 text-base">
                  {renderRichText(answer)}
                </div>
              </span>
            </details>
            <hr className="mt-8 border-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
