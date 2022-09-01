import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function CustomAccordian({ question, answer }) {
  return (
    <>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingOne">
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
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {question}
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show font-sans font-light"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body py-4 px-5">{renderRichText(answer)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
