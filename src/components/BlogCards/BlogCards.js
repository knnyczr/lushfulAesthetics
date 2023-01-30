import React from "react";
import BlogCardDesktop from "./BlogCardDektop";
import BlogCardMobile from "./BlogCardMobile";

export default function BlogCards({
  facialAesthetic,
  bodyAesthetic,
  sexualEnhancement,
}) {
  //   const facicalCategory = facialAesthetic.slice(0, 3);
  //   const bodyCategory = bodyAesthetic.slice(0, 3);
  //   const sexualCategory = sexualEnhancement.slice(0, 3);

  //   console.log("BlogCards", facicalAe, bodyAe, sexualAe);
  return (
    <>
      <div className="bg-red-300 hidden w-full h-auto md:flex md:flex-col p-16">
        <BlogCardDesktop
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
        />
      </div>
      <div className="md:hidden flex flex-col bg-purple-600 h-auto">
        <BlogCardMobile
          facicalCategory={facialAesthetic}
          bodyCategory={bodyAesthetic}
          sexualCategory={sexualEnhancement}
        />
      </div>
    </>
  );
}
