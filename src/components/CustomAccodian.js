import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function CustomAccordion({ question, answer, index }) {
  return (
    <section className="text-black">
      <div className="py-1 mx-auto">
        <div className="flex flex-wrap ">
          <div className="w-full py-2">
            <details className="mb-2 group open:ring">
              <summary className="flex justify-between items-center font-semibold text-lg font-serif list-none cursor-pointer ">
                {question}{" "}
                <span className="group-open:hidden ml-4 md:ml-8">
                  <FontAwesomeIcon className="fa-xs" icon={faPlus} />
                </span>
                <span className="hidden group-open:inline ml-4 md:ml-8">
                  <FontAwesomeIcon className="fa-xs" icon={faMinus} />
                </span>
              </summary>
              <span className="mt-6 px-6 text-base">
                {renderRichText(answer)}
              </span>
            </details>
            <hr className="mt-8 border-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
