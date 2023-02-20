import React from "react";
import { Link } from "gatsby";
import { formatDate } from "../../../hooks/format-date";

export default function BlogCardDesktop({
  facialCategory,
  bodyCategory,
  sexualCategory,
}) {
  return (
    <>
      {[facialCategory, bodyCategory, sexualCategory].map((categoryObj, _) => {
        return (
          <div key={_}>
            <div className="h-0.5 bg-black mb-4" />

            <Link to={`${categoryObj[0].category.slug}`}>
              <h1 className="font-sans uppercase text-2xl mb-6 hover:text-main-green">
                {categoryObj[0].category.categoryTitle}
              </h1>
            </Link>

            {categoryObj
              .filter((post, index, arr) => {
                if (arr.length < 3 || (arr.length >= 3 && index === 0))
                  return post;
              })
              .map((post, idx) => (
                <div key={idx}>
                  <LatestPost post={post} />
                </div>
              ))}

            {categoryObj.length >= 3 && (
              <div className="w-full h-[20rem] grid gap-4 grid-cols-2">
                {categoryObj
                  .filter((post, index) => {
                    if (index > 0) return post;
                  })
                  .map((post, idx) => (
                    <div key={idx}>
                      <Link
                        to={`${post.category.slug}/${post.uniqueIdentifier}`}
                        key={idx}
                      >
                        <div className="flex flex-col items-center w-full h-[18rem] mr-2 cursor-pointer">
                          <div
                            style={{
                              backgroundImage: `url(${post.heroImage.url})`,
                              backgroundSize: `cover`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `50% 50%`,
                            }}
                            className="w-full h-full mb-4"
                          ></div>

                          <div className="flex flex-col items-center">
                            <h3 className="text-2xl">{post.title}</h3>
                            <p>Posted on {formatDate(post.datePosted)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

const LatestPost = ({
  post: {
    category: { slug },
    uniqueIdentifier,
    heroImage,
    title,
    datePosted,
  },
}) => {
  return (
    <div className="w-full h-full mb-12 cursor-pointer">
      <Link to={`${slug}/${uniqueIdentifier}`}>
        <div
          style={{
            backgroundImage: `url(${heroImage.url})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `50% 50%`,
          }}
          className="h-[20rem] lg:h-[30rem] w-auto mb-6"
        ></div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">{title}</h1>
          <p>Posted on {formatDate(datePosted)}</p>
        </div>
      </Link>
    </div>
  );
};
