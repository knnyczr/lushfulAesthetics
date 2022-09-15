import { Link } from "gatsby";
import React from "react";
import Button from "./BookBtn";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ServicePrice({ intro, pricing }) {
  // console.log("pricing: ", pricing);

  return (
    <>
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">
          What Is It For?
        </h2>
        <div className="max-w-screen-lg lg:text-lg">{intro}</div>

        <div className="my-6">{pricing}</div>

        <Button />
      </div>
    </>
  );
}
