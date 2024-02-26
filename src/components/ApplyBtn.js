import React from "react";

export default function ApplyBtn({ url, text }) {
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${text} (opens in a new tab)`}
        href={`${url}`}
      >
        <button
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white text-sm lg:text-lg uppercase w-full min-w-[280px]"
          type="button"
        >
          {text}
        </button>
      </a>
    </>
  );
}
