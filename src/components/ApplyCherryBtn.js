import React from "react";

export default function ApplyCherryBtn({ url }) {
  return (
    <>
      <a target="_blank" href={`${url}`}>
        <button
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white text-sm lg:text-lg uppercase"
          type="button"
        >
          Apply With Cherry
        </button>
      </a>
    </>
  );
}
