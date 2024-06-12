import React from "react";

export default function OurApproach({ ourApproach, subheadingTwo }) {
  return (
    <div className="px-4 sm:px-6 d:px-12 lg:px-24 pb-16 lg:pb-20 flex flex-col justify-start md:justify-center">
      <div className="border border-black px-4 py-6 md:px-12 md:py-12">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-6">
          {subheadingTwo || `Our Approach`}
        </h2>
        <hr className="mb-8 border-black" />
        <div className="max-w-screen-lg lg:text-lg [&>*]:mb-6">
          {ourApproach}
        </div>
      </div>
    </div>
  );
}
