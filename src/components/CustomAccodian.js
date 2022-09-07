import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function CustomAccordion({ question, answer, index }) {
  console.log("hre is accordion: ", index);
  return (
    <>
      <div class="accordion-item bg-white border border-gray-200">
        <h2 class="accordion-header mb-0" id={`accordion${index}`}>
          <button
            class="
                accordion-button
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
                font-serif
                font-extrabold
              "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded={false}
            aria-controls={`collapse${index}`}
          >
            {question}
          </button>
        </h2>
        <div
          id={`collapse${index}`}
          class="accordion-collapse collapse show font-sans font-light"
          aria-labelledby={`accordion${index}`}
          data-bs-parent={`#accordion${index}`}
        >
          <div class="accordion-body py-4 px-5">{renderRichText(answer)}</div>
        </div>
      </div>
    </>
  );
}
