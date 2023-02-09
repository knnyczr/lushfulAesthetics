import { Link } from "gatsby";
import React from "react";

export default function CategoryBlogFeed({ blogPosts }) {
  console.log("here are blog posts", blogPosts);
  return (
    <div className="order-2 mb-20 px-4 md:order-last">
      {blogPosts.map((post, _) => {
        return (
          <div key={_} className="grid grid-cols-3 gap-2">
            <Link
              className="col-start-1"
              to={`/blog/${post.category.slug}/${post.uniqueIdentifier}`}
            >
              <div
                className="w-20 h-20"
                style={{
                  backgroundImage: `url(${post.heroImage.url})`,
                  backgroundSize: `cover`,
                }}
              />
            </Link>
            <Link
              className="col-start-2 col-end-4"
              to={`/blog/${post.category.slug}/${post.uniqueIdentifier}`}
            >
              <h2 className="font-medium font-sans text-xl">{post.title}</h2>
              <p className="sm:hidden font-sans font-normal">
                {post.intro.slice(0, 70)}...
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
