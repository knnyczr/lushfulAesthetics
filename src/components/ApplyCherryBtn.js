import React from "react";
import { Link } from "gatsby";

export default function ApplyCherryBtn() {
  return (
    <>
      <Link to="/apply-with-cherry">
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
