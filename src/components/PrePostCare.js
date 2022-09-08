import React from "react";
import { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";

export default function PrePostCare({ preCare, postCare, heroImage }) {
  const [pre, setPre] = useState(false);
  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 1000,
      height: 1000,
    },
  });

  console.log(`here is the postCare:`, postCare);
  console.log(`here is the postCare:`, preCare);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center bg-main-green">
        <div className="lg:w-7/12 px-4 py-16 sm:px-6 lg:px-24 lg:py-8 xl:py-12 flex flex-col justify-start md:justify-center">
          <div>
            <span
              onClick={() => setPre(!pre)}
              className={
                pre
                  ? "hover:text-main-green-shade text-3xl font-serif font-bold"
                  : "text-white hover:text-main-green-shade text-3xl font-serif font-bold"
              }
            >
              PreCare {``}
            </span>
            <span
              onClick={() => setPre(!pre)}
              className={
                pre
                  ? "hover:text-main-green-shade text-3xl font-serif font-bold text-white"
                  : "hover:text-main-green-shade text-3xl font-serif font-bold"
              }
            >
              PostCare
            </span>
          </div>

          <div>
            {pre ? (
              <div className="my-12 text-white">
                {preCare[0].props.children.map((precare, idx) => {
                  return (
                    <div className="my-4" key={idx}>
                      {precare.props.children[0].props.children[0]}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="my-8 text-white leading-8">{postCare}</div>
            )}
          </div>
        </div>

        <div className="lg:w-5/12 hidden lg:flex lg:justify-end overflow-hidden max-h-96">
          <GatsbyImage image={dynamicImage} alt={`styling image`} />
        </div>
      </div>
    </>
  );
}
