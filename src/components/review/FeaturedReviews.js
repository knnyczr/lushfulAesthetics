import React from "react";

export default function FeaturedReviews({
  reviewContent,
  reviewerName,
  heroimage,
}) {
  console.log(heroimage, reviewContent);

  return (
    <div
      style={{
        backgroundImage: `url(${heroimage.url})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
      className="relative max-w-[1536px] mx-auto h-[600px] lg:h-auto lg:aspect-[19/9] lg:max-h-[800px]"
    >
      <div className="h-[600px] lg:h-auto lg:aspect-[19/9] lg:max-h-[800px] w-full flex flex-col justify-end items-start bg-gradient-to-b from-black/10 via-black/20 to-black/75 z-10 cursor-pointer text-white px-4 py-6 sm:p-6 md:px-12 md:py-6 lg:px-24 lg:py-12">
        <h5 className="text-sm lg:text-lg mb-3 lg:mb-4  pr-0 lg:pr-96">
          &quot; {reviewContent.reviewContent} &quot;
        </h5>
        <div className="flex flex-row items-center gap-2 w-full">
          <div className="w-10 h-10 bg-[#626161] rounded-full flex items-center justify-center">
            {reviewerName?.charAt(0)}
          </div>

          <p className="font-sans capitalize">{reviewerName}</p>
        </div>
        {/* <button className="uppercase underline text-sm font-bold">
          <Link to={`${featuredPost.category.slug}/${featuredPost.slug}/`}>
            read more
          </Link>
        </button> */}
      </div>
    </div>
  );
}
//
