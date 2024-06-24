import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import React from "react";
import { graphql } from "gatsby";
import HeroImage from "../components/HeroImage";
export { Head } from "../components/Layout";

export default function Press(data) {
  //   const { metaDescription, metaTitle } = data.contentfulPressPage;

  return (
    <>
      {/* <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        /> */}
      {/* <HeroImage heroImage={heroImage} pageTitle="This is the page title" /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1536px] px-4 py-4 md:px-12 lg:px-4 mx-auto">
        <div className="md:col-start-3 py-4 px-4 md:pr-8 2xl:pr-0">
          <div>
            <div class="h-0.5 bg-black mb-4"></div>
            <div className="font-sans uppercase text-2xl mb-6 hover:text-main-green">
              Social Media
            </div>
          </div>
          <div className="mt-16">
            <div class="h-0.5 bg-black mb-4"></div>
            <div className="font-sans uppercase text-2xl mb-6 hover:text-main-green">
              Contact Information
            </div>
          </div>
        </div>
        <div className="md:row-start-1 md:px-12 lg:px-24 2xl:pl-0 md:col-span-2 px-4 py-4">
          <div className="mb-8 ">
            <h3>Disclaimer*</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              suscipit purus nec purus finibus, vitae ornare libero tristique.
              Fusce pharetra convallis urna, id pulvinar odio volutpat eu.
              Maecenas aliquam eget ipsum vitae facilisis. Vivamus maximus velit
              commodo, varius ligula vel, consequat est. Pellentesque ac massa
              lorem. Nullam eget mollis lectus. Phasellus quis ligula arcu.{" "}
            </p>
          </div>
          <div class="h-0.5 bg-black mb-4"></div>
          <div className="font-sans uppercase text-2xl mb-6 hover:text-main-green">
            Featured Press Release
          </div>
          {/* Needs query information */}
          <div className="md:pr-8 lg:pr-24 flex flex-col gap-2">
            <div className="w-full max-w-[150px] bg-red-100 h-9">
              This is the image
            </div>
            <h2 className="text-lg lg:text-2xl">
              Title, need to replace this with the actual title but this could
              work for now
            </h2>
            <p>December 8th, 2023</p>
          </div>
        </div>
      </div>
    </>
  );
}

// export const pageQuery = graphql`
//   query PressPageQuery {
//     contentfulPressPage {
//       heroImage {
//         gatsbyImageData(layout: FULL_WIDTH, quality: 100)
//       }
//     }
//   }
// `;
