import React from "react";
import { Link } from "gatsby";

export default function BlogCardDesktop({
  facicalCategory,
  bodyCategory,
  sexualCategory,
}) {
  console.log(facicalCategory, bodyCategory, sexualCategory);
  return (
    <>
      {[facicalCategory, bodyCategory, sexualCategory].map((category) => (
        <Link to={`${category[0].category.slug}`}>
          <div className="h-0.5 bg-black mb-4" />
          <h1 className="font-sans uppercase text-2xl mb-6">
            {category[0].category.categoryTitle}
          </h1>
          <CategoryCards category={[category, category, category]} />
        </Link>
      ))}
    </>
  );
}

const CategoryCards = ({ category }) => {
  const bigCard = category.slice(0, 1);
  const midCards = category.slice(1, 3);
  console.log("blogCards data:", category);

  let dateString = bigCard[0].datePosted;
  let date = new Date(dateString);
  let options = { month: "long", day: "numeric", year: "numeric" };
  let newDateFormat = date.toLocaleString("en-US", options);

  return (
    <>
      <div className="w-full h-auto mb-6 md:mb-12 lg:mb-24">
        <div className="w-full h-full mb-12 cursor-pointer">
          <Link
            to={`${bigCard[0][0].category.slug}/${bigCard[0][0].uniqueIdentifier}`}
          >
            <div
              style={{
                backgroundImage: `url(${bigCard[0][0].heroImage.url})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `50% 50%`,
              }}
              className="h-[20rem] lg:h-[30rem] w-auto mb-6"
            ></div>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl">{bigCard[0][0].title}</h1>
              <p>Posted on {newDateFormat}</p>
            </div>
          </Link>
        </div>

        <div className="w-full h-[20rem] grid gap-4 grid-cols-2">
          {midCards.map((midCard, idx) => {
            let dateString = midCard[0].datePosted;
            let date = new Date(dateString);
            let options = { month: "long", day: "numeric", year: "numeric" };
            let newDateFormat = date.toLocaleString("en-US", options);
            return (
              <Link
                to={`${midCard[0].category.slug}/${midCard[0].uniqueIdentifier}`}
              >
                <div className="flex flex-col items-center w-full h-[18rem] mr-2 cursor-pointer">
                  <div
                    key={idx}
                    style={{
                      backgroundImage: `url(${midCard[0].heroImage.url})`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `50% 50%`,
                    }}
                    className="bg-green-400 w-full h-full"
                  ></div>

                  <div className="flex flex-col items-center">
                    <h3>{midCard[0].title}</h3>
                    <p>Posted on {newDateFormat}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
