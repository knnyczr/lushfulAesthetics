import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import HeroImage from "../components/HeroImage";
import FeaturedPost from "../components/blog/FeaturedPost";
import PatientReviews from "../components/review/PatientReviews";
import {
  faTiktok,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedReviews from "../components/review/FeaturedReviews";

export default function Reviews({ data }) {
  const {
    contentfulHomePage: { reviews },
    contentfulReviewsPage: {
      pageTitle,
      reviewContent,
      reviewerName,
      heroimage,
    },
    contentfulBlogHomepage: { featuredPost },
    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
    },
    contentfulContactPage: { address },
    contentfulPressPage: { email },
  } = data;

  console.log(
    "reviews data",
    pageTitle,
    reviewContent,
    reviewerName,
    heroimage
  );

  const formattedAddress = address.replace(
    "New York, NY 10017",
    "<br>New York, NY 10017"
  );

  return (
    <>
      {/* Featured Reviews */}
      <div className="relative flex justify-between items-center mx-auto max-w-[1536px] ">
        <FeaturedReviews
          pageTitle={pageTitle}
          reviewContent={reviewContent}
          reviewerName={reviewerName}
          heroimage={heroimage}
        />
      </div>

      {/* page content here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1536px] px-4 py-8 md:px-12 lg:px-4 mx-auto">
        <div className=" lg:px-24 2xl:pl-0 lg:pr-16 lg:col-span-2 py-4">
          {" "}
          <PatientReviews />
        </div>

        {/* right side */}
        <div className=" py-4 2xl:pr-0">
          <div>
            <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
              Leave us a review
            </div>
            <div className="h-0.5 bg-black mb-4"></div>
            <div className="flex flex-col gap-3 items-start py-2">
              <div className="">
                <StaticImage
                  src="../images/google_reviews_logo.png"
                  alt="Google Reviews"
                  width={120}
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Here is the link where I got the Business ID from: */}
              {/* https://developers.google.com/maps/documentation/places/web-service/place-id */}
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJ1cIlk0JZwokRQOqE6XMWUL8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Leave us a review on Google (opens in a new tab)"
              >
                <button
                  className="py-3 px-6 text-sm text-bold md:text-base bg-main-green hover:bg-main-green-shade rounded text-white uppercase whitespace-nowrap "
                  type="button"
                >
                  Leave a review
                </button>
              </a>
            </div>
          </div>
          <div className="mt-8 lg:mt-16">
            <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
              Social Media
            </div>
            <div className="h-0.5 bg-black mb-4"></div>
            <div className="flex flex-row gap-6 items-end py-2 text-3xl">
              {socialTwitter && socialTwitter.startsWith("https://www.") && (
                <a
                  href={`${socialTwitter}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Twitter (opens in a new tab)"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              )}
              {socialInstagram &&
                socialInstagram.startsWith("https://www.") && (
                  <a
                    href={`${socialInstagram}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Follow us on Instagram (opens in a new tab)"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                )}

              {socialTiktok && socialTiktok.startsWith("https://www.") && (
                <a
                  href={`${socialTiktok}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Tiktok (opens in a new tab)"
                >
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              )}

              {youtube && youtube.startsWith("https://www.") && (
                <a
                  href={`${youtube}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Tiktok (opens in a new tab)"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              )}
            </div>
          </div>
          <div className="mt-8 lg:mt-16">
            <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
              Contact Information
            </div>
            <div className="h-0.5 bg-black mb-4"></div>
            <div className="flex flex-col items-start gap-6">
              <div>
                <p>For press, please email:</p>{" "}
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="max-w-xs">
                <p dangerouslySetInnerHTML={{ __html: formattedAddress }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ReviewsPageQuery {
    contentfulContactPage {
      address
    }

    contentfulReviewsPage {
      metaTitle
      metaDescription
      pageTitle
      reviewContent {
        reviewContent
      }
      reviewerName
      heroimage {
        url
      }
    }

    contentfulPressPage {
      email
    }

    contentfulHomePage {
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
    contentfulFooterContent {
      socialInstagram
      socialTiktok
      socialTwitter
      youtube
    }

    contentfulBlogHomepage {
      metaTitle
      metaDescription
      featuredPost {
        heroImage {
          id
          title
          url
        }
        category {
          categoryTitle
          slug
        }
        datePosted
        intro
        title
        slug
      }
    }
  }
`;
