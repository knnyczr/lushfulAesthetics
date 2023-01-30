import React from "react";
import BlogCardDesktop from "./BlogCardDektop";
import BlogCardMobile from "./BlogCardMobile";

export default function BlogCards({
  facialAesthetic,
  bodyAesthetic,
  sexualEnhancement,
}) {
  //   console.log("blogCards data:", slugs);

  return (
    <>
      <div className="hidden w-full h-auto md:flex md:flex-col">
        <BlogCardDesktop
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
        />
      </div>
      <div className="md:hidden flex flex-col h-auto">
        <BlogCardMobile
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
        />
      </div>
    </>
  );
}
