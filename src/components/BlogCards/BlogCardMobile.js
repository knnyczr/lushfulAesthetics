import React from "react";
import { Link } from "gatsby";

export default function BlogCardMobile({
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
  return (
    <div>
      <div className="w-full h-auto">
        <div className="flex overflow-x-scroll">
          <div className="flex flex-nowrap snap-mandatory snap-x">
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
                  className="bg-green-400 w-full h-[35rem]"
                >
                  <div className="text-white">
                    <h3>{card[0].title}</h3>
                    <p>{card[0].intro}</p>
                    <p>Posted on {formatDate(card[0].datePosted)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h1>Body Aesthetic</h1>
      </div>
      <div>
        <h1>Sexual Enhancement</h1>
      </div>
    </div>
  );
};
