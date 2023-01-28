import React from "react";
import { Link } from "gatsby";

export default function CategoryChip({ name, slug }) {
  console.log(name, slug);
  return (
    <div>
      <Link to={`/blog/${slug}`}>
        <span className="px-4 py-2 mb-2 rounded-full bg-main-green text-white font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
          {name}
        </span>
      </Link>
    </div>
  );
}
