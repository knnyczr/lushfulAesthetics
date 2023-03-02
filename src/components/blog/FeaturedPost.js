import { Link } from "gatsby";
import React from "react";
import { formatDate } from "../../hooks/format-date";

export default function FeaturedPost({ featuredPost }) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${featuredPost.heroImage.url})`,
          backgroundSize: `cover`,
        }}
        className="relative"
      >
        <div className="h-[36rem] lg:h-136 w-full flex flex-col justify-end items-start bg-gradient-to-b from-black/10 via-black/10 to-black/50 z-10 cursor-pointer text-white px-4 py-6 sm:p-6 md:px-12 md:py-6 lg:px-24 lg:py-12">
          <h5 className="mb-2 lg:mb-4 lg:text-lg">Featured</h5>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
            {featuredPost.title}
          </h2>
          <h5 className="text-sm lg:text-lg mb-3 lg:mb-4">
            {formatDate(featuredPost.datePosted)}
          </h5>
          <p className="font-sans mb-3 lg:mb-4 lg:w-9/12">
            {featuredPost.intro}
            {featuredPost.intro}
          </p>
          <button className="uppercase underline text-sm font-bold">
            <Link
              to={`${featuredPost.category.slug}/${featuredPost.uniqueIdentifier}/`}
            >
              read more
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
