import React from "react";

export default function AcceptCookiePopover({ setHasAcceptedCookies }) {
  return (
    <div className="fixed inset-x-0 bottom-10 w-full flex justify-center">
      <div
        style={{
          boxShadow: `0px 4px 20px 6px rgba(0, 0, 0, 0.15)`,
        }}
        className="w-11/12 bg-white rounded-md pt-6 pb-4 px-6 md:px-16 md:py-6 flex flex-col md:flex-row items-center"
      >
        <p className="text-xs flex">{`Lushful Aesthetics utilizes third-party cookies and additional non-essential tracking technologies (referred to collectively as “Cookies”) for various purposes, including statistical analysis, personalizing your browsing experience, and for advertising and social media engagements. These Cookies help in tracking your usage of our website, delivering ads tailored to your interests, enhancing our services, and ensuring efficient navigation on our site. You have the option to either accept or decline all Cookies. For more detailed information about the trackers we use and your rights concerning them, please read more. Privacy Policy.`}</p>
        <div className="w-full text-center md:text-left mt-5 md:mt-0 md:w-3/5 md:ml-10">
          <button
            onClick={() => setHasAcceptedCookies(true)}
            className="py-3 px-6 w-full text-sm text-bold md:text-base bg-main-green hover:bg-main-green-shade text-white uppercase whitespace-nowrap rounded"
          >
            Accept
          </button>
          <button className="text-sm w-full underline mt-2">
            Cookie Settings
          </button>
        </div>
      </div>
    </div>
  );
}
