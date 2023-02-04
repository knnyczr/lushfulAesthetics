import React from "react";
import { Link } from "gatsby";
import { formatDate } from "../../hooks/format-date";

export default function BlogCardMobile({
  facicalCategory,
  bodyCategory,
  sexualCategory,
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

const CategoryCards = ({ category }) => {
  return (
    <div className="w-full h-auto pb-16">
      <div className="flex overflow-x-scroll ">
        <div className="flex flex-nowrap snap-mandatory snap-x gap-8">
          {category.map((card, idx) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundImage: `url(${card[0].heroImage.url})`,
                  backgroundSize: `cover`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `50% 50%`,
                }}
                className="w-blogcard h-[32rem] sm:w-blogcard-sm sm:h-[35rem] relative snap-start"
              >
                <div className="text-white w-blogcard h-[32rem] sm:w-blogcard-sm sm:h-[35rem] bg-gradient-to-b from-black/0 via-black/0 to-black/75 z-10 cursor-pointer flex flex-col justify-end items-start px-4 py-6">
                  <h3 className="font-serif text-3xl font-bold">
                    {card[0].title}
                  </h3>
                  <p className="text-sm lg:text-lg my-3 lg:my-4">
                    Posted on {formatDate(card[0].datePosted)}
                  </p>
                  <p className="text-sm">{card[0].intro}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
