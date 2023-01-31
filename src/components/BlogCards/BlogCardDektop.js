import React from "react";
import { Link } from "gatsby";

export default function BlogCardDesktop({
  facicalCategory,
  bodyCategory,
  sexualCategory,
  formatDate,
}) {
  return (
    <>
      {[facicalCategory, bodyCategory, sexualCategory].map((category, idx) => (
        <Link to={`${category[0].category.slug}`} key={idx}>
          <div className="h-0.5 bg-black mb-4" />
          <h1 className="font-sans uppercase text-2xl mb-6">
            {category[0].category.categoryTitle}
          </h1>
          <CategoryCards
            category={[category, category, category]}
            formatDate={formatDate}
          />
        </Link>
      ))}
    </>
  );
}

const CategoryCards = ({ category, formatDate }) => {
  const bigCard = category.slice(0, 1);
  const midCards = category.slice(1, 3);

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
              <p>Posted on {formatDate(bigCard[0][0].datePosted)}</p>
            </div>
          </Link>
        </div>

        <div className="w-full h-[20rem] grid gap-4 grid-cols-2">
          {midCards.map((midCard, idx) => {
            return (
              <Link
                to={`${midCard[0].category.slug}/${midCard[0].uniqueIdentifier}`}
                key={idx}
              >
                <div className="flex flex-col items-center w-full h-[18rem] mr-2 cursor-pointer">
                  <div
                    style={{
                      backgroundImage: `url(${midCard[0].heroImage.url})`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `50% 50%`,
                    }}
                    className="w-full h-full mb-4"
                  ></div>

                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl">{midCard[0].title}</h3>
                    <p>Posted on {formatDate(midCard[0].datePosted)}</p>
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
