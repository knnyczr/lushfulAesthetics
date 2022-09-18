import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Button from "../components/BookBtn";
import Reviews from "../components/Reviews";
import { Helmet } from "react-helmet";

export default function IndexPage({ data }) {
  const {
    slogan,
    visionStatement,
    address,
    // googleLocation,
    reviews,
    heroImage,
  } = data.contentfulHomePage;

  const image = getImage(heroImage);

  return (
    <div>
      <Helmet title={`Lushful Aesthetics | Home`} />
      <div className="relative w-full h-3/6 overflow-hidden">
        <GatsbyImage
          image={image}
          alt={`${heroImage.description}`}
          style={{ height: "600px" }}
        />
        <div className="absolute bottom-6 flex flex-col justify-center items-center w-screen left-1/2 -translate-x-1/2 -translate-y-1/2 md:justify-start lg:items-start lg:-translate-y-48 lg:pl-20">
          <h1 className="font-serif font-bold text-white text-3xl md:text-4xl lg:text-5xl text-center lg:text-left py-6 lg:py-8 w-full">
            {slogan}
          </h1>
          <Button />
        </div>
      </div>

      <div className="px-4 md:px-12 lg:px-24 py-24 lg:py-36 flex flex-col justify-start md:justify-center md:items-center">
        <div className="max-w-screen-2xl font-serif font-bold text-black text-2xl md:text-3xl lg:text-4xl text-center leading-10">
          {visionStatement}
        </div>
      </div>

      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 bg-main-green">
        <Reviews reviews={reviews} />
      </div>

      {/* <ReviewComponent reviews={reviews} /> */}

      <div className="px-4 py-12 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center ">
        <div className=" border border-black py-8 px-3 lg:py-10 lg:px-12 flex justify-center items-center flex-col md:flex-row">
          <div className="mx-10 w-90 max-w-md h-80 flex justify-center items-center rounded">
            <a
              href="https://goo.gl/maps/3mpJJytXMqn581Yw9"
              target="_blank"
              rel="noreferrer"
            >
              <StaticImage
                alt="image of map, link for google maps"
                src="../images/Lushful_address.png"
                width={600}
              />
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
        gatsbyImageData(
          quality: 100
          width: 100
          height: 50
          layout: FULL_WIDTH
          cropFocus: TOP
          resizingBehavior: FILL
        )
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
          file {
            url
          }
        }
      }
    }
  }
`;
