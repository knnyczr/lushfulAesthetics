import { Link } from "gatsby";
import React from "react";
import { formatDate } from "../../hooks/format-date";

export default function CategoryBlogFeed({ blogPosts }) {
  return (
    <div className="order-2 mb-5 px-4 md:order-last md:col-span-3 md:px-0">
      {blogPosts.map((post, _) => {
        return (
          <div key={_} className="flex items-center mb-5">
            <Link
              className=""
              to={`/blog/${post.category.slug}/${post.uniqueIdentifier}/`}
            >
              <div className="flex-auto w-40 h-40 lg:w-60 lg:h-60">
                <img
                  src={post.heroImage.url}
                  style={{
                    height: `100%`,
                    objectFit: `cover`,
                  }}
                />
              </div>
            </Link>
            <Link to={`/blog/${post.category.slug}/${post.uniqueIdentifier}/`}>
              <div className="flex flex-col flex-auto ml-5">
                <p className="font-sans font-medium md:order-3 md:mb-2">
                  {formatDate(post.datePosted)}
                </p>
                <h2 className="font-bold font-sans text-2xl md:order-1 md:mb-2">
                  {post.title}
                </h2>
                <p className="hidden font-sans font-normal mb-2 md:block md:order-2 lg:hidden">
                  {post.intro.slice(0, 100)}...
                </p>
                <p className="hidden font-sans font-normal mb-2 lg:mb-2 lg:block lg:order-3">
                  {post.intro.slice(0, 300)}...
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
