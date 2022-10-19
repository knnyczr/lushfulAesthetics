import React from "react";
import { Link } from "gatsby";

export default function ApplyCherryBtn({ url }) {
  return (
    <>
      <Link target="_blank" to={`${url}`}>
        <button
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white text-sm lg:text-lg uppercase"
          type="button"
        >
          Apply With Cherry
        </button>
      </Link>
    </>
  );
}
