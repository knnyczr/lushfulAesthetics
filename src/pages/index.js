import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import Button from "../components/BookBtn";
import Reviews from "../components/Reviews";
import Map from "../components/Map";
import ReviewComponent from "../components/ReviewComponent";

// export function HeroImageIndex({ width, height, heroImage }) {
//   return useContentfulImage({
//     image: {
//       url:
//         heroImage.gatsbyImageData.images.sources[0].srcSet ||
//         heroImage.gatsbyImageData.images.fallback.srcSet,
//       width: width,
//       height: height,
//       quality: 100,
//       cropFocus: "top",
//       resizingBehavior: "fill",
//     },
//   });
// }

export default function IndexPage({ data }) {
  const {
    slogan,
    visionStatement,
    address,
    googleLocation,
    reviews,
    heroImage,
  } = data.contentfulHomePage;

  // const dynamicImage = useContentfulImage({
  //   image: {
  //     url:
  //       heroImage.gatsbyImageData.images.sources[0].srcSet ||
  //       heroImage.gatsbyImageData.images.fallback.srcSet,
  //     width: 3000,
  //     height: 1000,
  //     quality: 100,
  //     cropFocus: "top",
  //     resizingBehavior: "fill",
  //   },
  // });

  const image = getImage(heroImage);

  // console.log(`Here is the address:`, renderRichText(address));

  return (
    <div>
      <div className="relative w-full h-auto">
        <GatsbyImage
          className="shrink w-full sm:h-3/4 md:h-1/2"
          image={image}
          alt={`${heroImage.description}`}
        />
        <div className="absolute bottom-10 left-4 md:top-40 md:left-12 lg:top-60 lg:left-24">
          <h1 className="font-serif font-bold text-white text-lg md:text-2xl lg:text-4xl my-6">
            {slogan}
          </h1>
          <Button />
        </div>
      </div>

      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-start md:justify-center md:items-center">
        <div className="max-w-screen-sm font-serif font-bold text-lg md:text-2xl lg:text-3xl text-center leading-10">
          {visionStatement}
        </div>
      </div>

      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 bg-main-green">
        <Reviews reviews={reviews} />
      </div>

      {/* <ReviewComponent reviews={reviews} /> */}

      <div className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center ">
        <div className=" border border-black py-8 px-3 lg:py-12 lg:px-12 flex justify-center items-center flex-col md:flex-row">
          <div className="mx-10 w-60 max-w-md h-60 flex justify-center items-center">
            <a
              href="https://goo.gl/maps/3mpJJytXMqn581Yw9"
              target="_blank"
              rel="noreferrer"
            >
              <StaticImage src="../images/Lushful_address.png" width={600} />
            </a>
            {/* <img
              className="rounded-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            /> */}
            {/* https://www.gatsbyjs.com/plugins/@ccalamos/gatsby-source-googlemaps-static/ */}
            {/* <div>{googleLocation.lat}</div>
            <div>{googleLocation.lon}</div> */}
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-serif text-2xl font-semibold my-4">
              Lushful Aesthetics™ by InjectorChris
            </div>
            <div className="font-medium my-4">{renderRichText(address)}</div>
            <div>
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  # query will go here
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    contentfulHomePage {
      slogan
      visionStatement
      heroImage {
        gatsbyImageData(layout: CONSTRAINED, quality: 100)
      }
      address {
        raw
      }
      googleLocation {
        lat
        lon
      }
      reviews {
        review
        reviewerName
        bgImage {
          gatsbyImageData(quality: 100, layout: CONSTRAINED)
        }
      }
    }
  }
`;
