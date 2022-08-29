import React from "react";
import { Link } from "gatsby";

function Button() {
  return (
    <>
      <Link to="/book">
        <button
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white  uppercase mx-4 my-4"
          type="button"
        >
          Book Now
        </button>
      </Link>
    </>
  );
}

export default Button;
