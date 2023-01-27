import React from "react";

export default function BlogCardDesktop({
  facialAesthetic,
  bodyAesthetic,
  sexualEnhancement,
}) {
  // console.log("LALALALALALA", facialAesthetic);

  const bigCard = facialAesthetic.slice(0, 1);
  const midCard = facialAesthetic.slice(1, 3);
  // console.log("slice testing", bigCard, midCard);

  let dateString = bigCard[0].datePosted;
  let date = new Date(dateString);
  let options = { month: "long", day: "numeric", year: "numeric" };
  let newDateFormat = date.toLocaleString("en-US", options);

  return (
    <>
      <div className="bg-red-300 hidden w-full h-auto md:flex md:flex-col p-16  ">
        <div className="w-full mb-12 cursor-pointer">
          <div
            style={{
              backgroundImage: `url(${bigCard[0].heroImage.url})`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `50% 50%`,
            }}
            className="h-[40rem] w-full mb-6"
          ></div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">{bigCard[0].title}</h1>
            <p>Posted on {newDateFormat}</p>
          </div>
        </div>
        <div className="flex flex-row w-full h-96">
          {midCard.map((facial, idx) => {
            return (
              <>
                <div
                  key={idx}
                  style={{
                    backgroundImage: `url(${facial.heroImage.url})`,
                    backgroundSize: `cover`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `50% 50%`,
                  }}
                  className="bg-green-400 w-full h-auto"
                ></div>
                <div>
                  <h3>{facial.title}</h3>
                  <p>Posted on {facial.datePosted}</p>
                </div>
              </>
            );
          })}
          {/* placeholder div, can be deleted when ther's data */}
          <div className="bg-green-400 w-full h-auto cursor-pointer"></div>
          <div className="bg-purple-400 w-full h-auto cursor-pointer"></div>
        </div>
      </div>
    </>
  );
}
