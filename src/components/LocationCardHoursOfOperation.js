import React, { useState } from "react";

export default function HoursOfOperation(businessHoursFromRenderRichText) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getTodaysWeekday = () => {
    const today = new Date();
    const day = today.getDay();
    return [weekdays[day], day];
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <span
        onClick={toggleCollapse}
        className="cursor-pointer text-sm text-slate-800 hover:underline"
      >
        Today:{" "}
        {getTodaysWeekday()[1] !== "Saturday" ||
        getTodaysWeekday()[1] !== "Sunday"
          ? businessHoursFromRenderRichText[0].props.children[
              getTodaysWeekday()[1]
            ]
          : "Closed"}
      </span>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="relative mx-auto flex w-100 flex-col rounded-lg bg-white border border-slate-200 shadow-sm mt-4 ">
          <div className="pl-4 text-slate-600 font-light">
            {businessHoursFromRenderRichText[0].props.children.map(
              (dailyHoursOfOperation, index) => (
                <p key={index}>
                  {` ${weekdays[index + 1]} `}
                  {dailyHoursOfOperation}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
