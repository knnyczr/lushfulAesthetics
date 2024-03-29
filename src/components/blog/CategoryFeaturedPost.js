import React from "react";
import { Link } from "gatsby";
import { formatDate } from "../../hooks/format-date";

export default function CategoryFeaturedPost({ featuredPost, categoryTitle }) {
  return (
    <div className="order-first px-4 md:col-start-1 md:col-end-4 md:px-0">
      <h1 className="uppercase font-bold mb-4 text-2xl">{categoryTitle}</h1>
      <div className="h-0.5 bg-black mb-4" />
      <Link to={`/blog/${featuredPost.category.slug}/${featuredPost.slug}/`}>
        <div
          className="relative h-80 md:h-96 lg:h-128"
          style={{
            backgroundImage: `url(${featuredPost.heroImage.url})`,
            backgroundSize: `cover`,
          }}
        ></div>
        <div>
          <h2 className="font-sans text-2xl lg:text-4xl font-bold mt-3 mb-1 text-center">
            {featuredPost.title}
          </h2>
          <h5 className="text-center font-medium mb-2">
            {formatDate(featuredPost.datePosted)}
          </h5>
        </div>
      </Link>
    </div>
  );
}
