import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import React from "react";
import { graphql } from "gatsby";
import HeroImage from "../components/HeroImage";
import { BLOCKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { formatDate } from "../hooks/format-date";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
export { Head } from "../components/Layout";

export default function Press({ data }) {
  const {
    // contentfulContactPage: { address },
    contentfulContactPage: { ContactAddress },
    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
    },
    contentfulPressPage: {
      heroImage,
      disclosure,
      metaTitle,
      pressReviews,
      metaDescription,
      email,
    },
  } = data;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-base mb-4">{children}</p>
      ),
    },
  };

  const formattedAddress = ContactAddress.replace(
    "New York, NY 10017",
    "<br>New York, NY 10017"
  );

  // Sort reviews by datePosted in descending order
  const sortedReviews = pressReviews.sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
  );

  return (
    <>
      {metaTitle && metaDescription && (
        <HelmetWithMetaDesc
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />
      )}
      <HeroImage heroImage={heroImage} pageTitle="Press" />
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1536px] px-4 py-8 md:px-12 lg:px-4 mx-auto">
        <div className=" lg:px-24 2xl:pl-0 lg:pr-8 lg:col-span-2 py-4">
          <div className="mb-8 p-6 border">
            <p>{renderRichText(disclosure, options)}</p>
          </div>
          <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
            Featured Press Release
          </div>
          <div className="h-0.5 bg-black mb-8"></div>

          <div className="flex flex-col lg:gap-2">
            {sortedReviews.map((review) => {
              let mediaLogo = getImage(review.mediaLogo.companyLogo);
              let datePosted = review.datePosted;
              return (
                <a
                  href={review.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read the review article (opens in a new tab)"
                >
                  <div className="flex flex-col my-2" key={review.headline}>
                    <div className="max-w-[250px] h-fit">
                      <GatsbyImage
                        image={mediaLogo}
                        alt={`${review.mediaLogo.companyName}'s logo`}
                      />
                    </div>

                    <h2 className="font-serif text-xl lg:text-2xl font-bold md:pr-8 lg:pr-28 pt-6 pb-2 hover:underline ">
                      {review.headline}
                    </h2>
                    {datePosted && (
                      <p className="text-sm lg:text-lg mb-3 lg:mb-4">
                        {formatDate(datePosted)}
                      </p>
                    )}
                    <div className="h-[1px] bg-black/30 my-4"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className=" py-4 2xl:pr-0">
          <div>
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

export const pageQuery = graphql`
  query PressPageQuery {
    contentfulContactPage(id: { eq: "27aafb18-969b-5d82-81ba-317faf01a80e" }) {
      ContactAddress
    }
    contentfulFooterContent {
      socialInstagram
      socialTiktok
      socialTwitter
      youtube
    }
    contentfulPressPage {
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        description
      }
      metaTitle
      metaDescription
      email
      disclosure {
        raw
      }
      pressReviews {
        articleLink
        datePosted
        headline
        mediaLogo {
          companyName
          companyLogo {
            publicUrl
            gatsbyImageData(width: 200, quality: 90)
          }
        }
      }
    }
  }
`;
