import React from "react";
import BlogCardDesktop from "./BlogCardDektop";
import BlogCardMobile from "./BlogCardMobile";

export default function BlogCards({
  facialAesthetic,
  bodyAesthetic,
  sexualEnhancement,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  return (
    <>
      <div className="hidden w-full h-auto md:flex md:flex-col">
        <BlogCardDesktop
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
          formatDate={formatDate}
        />
      </div>
      <div className="md:hidden flex flex-col h-auto">
        <BlogCardMobile
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
          formatDate={formatDate}
        />
      </div>
    </>
  );
}
