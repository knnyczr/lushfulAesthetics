import React from "react";

export default function BlogCardDesktop({
  facicalCategory,
  bodyCategory,
  sexualCategory,
}) {
  // console.log("receiving", facicalCategory);

  return (
    <>
      {[facicalCategory, bodyCategory, sexualCategory].map((category) => (
        <CategoryCards category={[category, category, category]} />
      ))}
    </>
  );
}

const CategoryCards = ({ category }) => {
  //this will limit the number of blod posts showing under the category
  console.log("ihuisdbsdjksb", category);
  const bigCard = category.slice(0, 1);
  const midCard = category.slice(1, 3);
  console.log("slice testing", midCard);

  // let dateTest = facicalCategory.map((facial) => {
  //   return facial.datePosted;
  // });
  // console.log("slice testing", dateTest);
  // let dateString = bigCard[0].datePosted;
  // let date = new Date(dateString);
  // let options = { month: "long", day: "numeric", year: "numeric" };
  // let newDateFormat = date.toLocaleString("en-US", options);

  return (
    <>
      <div>
        <div className="w-full mb-12 cursor-pointer">
          <div
            style={{
              backgroundImage: `url(${bigCard[0][0].heroImage.url})`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `50% 50%`,
            }}
            className="h-[40rem] w-full mb-6"
          ></div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">{bigCard[0].title}</h1>
            {/* <p>Posted on {newDateFormat}</p> */}
          </div>
        </div>
        <div className="flex flex-row w-full h-96">
          {midCard.map((facial, idx) => {
            return (
              <>
                <div
                  key={idx}
                  style={{
                    backgroundImage: `url(${facial[0].heroImage.url})`,
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
          {/* <div className="bg-green-400 w-full h-auto cursor-pointer"></div>
          <div className="bg-purple-400 w-full h-auto cursor-pointer"></div> */}
        </div>
      </div>
    </>
  );
};
