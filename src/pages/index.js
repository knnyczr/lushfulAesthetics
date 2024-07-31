import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import Button from "../components/BookBtn";
import Reviews from "../components/Reviews";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import homepagePageOptions from "../helpers/homepagePageOptions";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export { Head } from "../components/Layout";

export default function IndexPage({ data }) {
  const {
    contentfulHomePage: {
      slogan,
      visionStatement,
      reviews,
      heroImage,
      metaTitle,
      metaDescription,
      contactInfo,
    },
    // contentfulContactPage: { address, phoneNumber },
  } = data;

  const image = getImage(heroImage);

  const options = homepagePageOptions();

  return (
    <div>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />

      {/* <a className="sr-only sr-only-focusable" href="#slogan">
        Skip to Slogan
      </a> */}

      <div className="relative w-full max-w-[1536px] mx-auto overflow-hidden">
        <GatsbyImage
          image={image}
          alt={`${heroImage.description}`}
          // style={{ height: "600px" }}
          className="w-full object-contain h-[400px] lg:h-auto lg:aspect-[19/9] lg:max-h-[800px]"
        />
        <div
          // id="slogan"
          className="absolute bottom-6 max-w-[1536px] flex flex-col justify-center items-center w-screen left-1/2 -translate-x-1/2 -translate-y-1/2 md:justify-start lg:items-start lg:-translate-y-24 lg:pl-20"
        >
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

      {/* <a className="sr-only sr-only-focusable" href="#reviews">
        Skip to Reviews
      </a> */}

      <div
        // id="reviews"
        className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 bg-main-green"
      >
        <Reviews reviews={reviews} />
      </div>

      {/* <a className="sr-only sr-only-focusable" href="#contact-info">
        Skip to Contact Information
      </a> */}
      <div className="px-4 py-12 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center">
        <div className="border border-black py-8 px-3 lg:py-10 lg:px-12 flex justify-center items-center flex-col md:flex-row">
          <div className="mx-10 w-full max-w-md h-auto flex justify-center items-center rounded">
            <a
              href="https://goo.gl/maps/3mpJJytXMqn581Yw9"
              target="_blank"
              rel="noreferrer"
              aria-label="View our location on Google Maps (opens in a new tab)"
            >
              <StaticImage
                alt="image of map, link for google maps"
                src="../images/Lushful_address.png"
                width={600}
              />
            </a>
          </div>

          <div className="flex flex-col justify-center max-w-md">
            {renderRichText(contactInfo, options)}
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
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    contentfulHomePage {
      metaTitle
      metaDescription
      slogan
      visionStatement
      contactInfo {
        raw
      }
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
      reviews {
        headline
        articleLink
        mediaLogo {
          companyName
          companyLogo {
            publicUrl
            gatsbyImageData(width: 200, quality: 90)
          }
        }
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
