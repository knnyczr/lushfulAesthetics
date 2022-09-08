import { Link } from "gatsby";
import React from "react";
import Button from "./BookBtn";
<<<<<<< HEAD

export default function ServicePrice({ ourApproach, pricing }) {
=======
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ServicePrice({ ourApproach, pricing }) {
  // console.log("pricing: ", pricing);

>>>>>>> kenny/kenny/menuEdits
  return (
    <>
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">
          What Is It For?
        </h2>
        <div className="max-w-screen-lg lg:text-lg">{ourApproach}</div>

<<<<<<< HEAD
        <div className="my-6">
          <div className="font-bold lg:text-lg mb-1">
            {pricing[0].props.children[0].props.children}
          </div>
          <div className="font-light text-sm">
            {pricing[1].props.children[0]}
          </div>
        </div>

        <Button />
        <div className="my-4 lg:text-lg">
          {pricing[2].props.children[0]}
          <span className="text-main-green hover:bg-main-green-shade underline">
            <Link to="/aesthetic-services/facial-treatments/facial-packages">
              here
            </Link>
          </span>
        </div>
=======
        <div className="my-6">{pricing}</div>

        <Button />
>>>>>>> kenny/kenny/menuEdits
      </div>
    </>
  );
}
