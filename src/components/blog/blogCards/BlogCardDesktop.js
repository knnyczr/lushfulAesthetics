import React from "react";
import { Link } from "gatsby";
import { formatDate } from "../../../hooks/format-date";

export default function BlogCardDesktop({ categories }) {
  return (
    <>
      {categories.map((categoryObj, _) => {
        return (
          <div key={_}>
            <div className="h-0.5 bg-black mb-4" />

            <Link to={`${categoryObj[0].category.slug}/`}>
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
              <div className="w-full grid gap-x-4 gap-y-8 grid-cols-2 mb-12">
                {categoryObj
                  .filter((post, index) => {
                    if (index > 0) return post;
                  })
                  .map((post, idx) => (
                    <div key={idx}>
                      <Link
                        to={`${post.category.slug}/${post.slug}/`}
                        key={idx}
                      >
                        <div className="flex flex-col w-full h-auto mr-2 cursor-pointer">
                          <div
                            style={{
                              backgroundImage: `url(${post.heroImage.url})`,
                              backgroundSize: `cover`,
                              backgroundRepeat: `no-repeat`,
                              backgroundPosition: `50% 50%`,
                            }}
                            className="w-full h-full mb-4 aspect-[3/2]"
                          ></div>

                          <div className="flex flex-col">
                            <h3 className="text-2xl">{post.title}</h3>
                            <p className="mt-1">
                              {formatDate(post.datePosted)}
                            </p>
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
  post: { category, slug, heroImage, title, datePosted },
}) => {
  return (
    <div className="w-full h-full mb-8 cursor-pointer">
      <Link to={`${category.slug}/${slug}/`}>
        <div
          style={{
            backgroundImage: `url(${heroImage.url})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `50% 50%`,
          }}
          className="h-[20rem] lg:h-auto lg:max-h-[32rem] w-full aspect-[3/2] mb-6"
        ></div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">{title}</h1>
          <p className="mt-1">{formatDate(datePosted)}</p>
        </div>
      </Link>
    </div>
  );
};
