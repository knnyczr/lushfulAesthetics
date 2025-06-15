import React from "react";

export default function PatientReviews({ reviews }) {
  return (
    <div className="">
      <div>
        <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
          Patient Reviews
        </div>
        <div className="h-0.5 bg-black mb-4"></div>
        <div className="flex flex-col gap-3 items-start py-2"></div>
      </div>
    </div>
  );
}
