import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import React from "react";
import { graphql } from "gatsby";
import HeroImage from "../components/HeroImage";
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
    contentfulHomePage: { reviews },
    contentfulContactPage: { address, email },
    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
    },
    contentfulFinancingPage: { heroImage },
  } = data;

  console.log("review", reviews);

  const formattedAddress = address.replace(
    "New York, NY 10017",
    "<br>New York, NY 10017"
  );

  return (
    <>
      {/* {metaTitle && metaDescription && (
        <HelmetWithMetaDesc
          metaTitle={metaTitle}
          metaDescription={metaDescription}
        />
      )} */}
      <HeroImage heroImage={heroImage} pageTitle="Press" />
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1536px] px-4 py-8 md:px-12 lg:px-4 mx-auto">
        <div className="mb-4 md:hidden order-first text-sm p-4 border">
          <h3>Disclaimer*</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            suscipit purus nec purus finibus, vitae ornare libero tristique.
            Fusce pharetra convallis urna, id pulvinar odio volutpat eu.
            Maecenas aliquam eget ipsum vitae facilisis. Vivamus maximus velit
            commodo, varius ligula vel, consequat est. Pellentesque ac massa
            lorem. Nullam eget mollis lectus. Phasellus quis ligula arcu.
          </p>
        </div>
        <div className="md:col-start-3 py-4 2xl:pr-0 order-first md:order-none">
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
        <div className="md:row-start-1 lg:px-24 2xl:pl-0 md:pr-8 md:col-span-2 py-4">
          <div className="mb-8 hidden md:block text-sm p-6 border">
            <h3>Disclaimer*</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              suscipit purus nec purus finibus, vitae ornare libero tristique.
              Fusce pharetra convallis urna, id pulvinar odio volutpat eu.
              Maecenas aliquam eget ipsum vitae facilisis. Vivamus maximus velit
              commodo, varius ligula vel, consequat est. Pellentesque ac massa
              lorem. Nullam eget mollis lectus. Phasellus quis ligula arcu.
            </p>
          </div>
          <div className="font-sans uppercase text-[20px] lg:text-2xl mb-2 lg:mb-4">
            Featured Press Release
          </div>
          <div className="h-0.5 bg-black mb-8"></div>

          <div className="flex flex-col lg:gap-2">
            {reviews.map((review, index) => {
              let image = getImage(review.bgImage);
              let mediaLogo = getImage(review.mediaLogo.companyLogo);
              return (
                <a
                  href={review.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read the review article (opens in a new tab)"
                >
                  <div className="flex flex-col my-2" key={review.headline}>
                    <div className="w-[140px] lg:w-[175px] h-auto">
                      <GatsbyImage
                        image={mediaLogo}
                        alt={`${review.mediaLogo.companyName}'s logo`}
                      />
                    </div>

                    <h2 className="font-serif text-xl lg:text-2xl font-bold md:pr-8 lg:pr-28 py-4 hover:underline ">
                      {review.headline}
                    </h2>
                    <p className="text-sm lg:text-lg mb-3 lg:mb-4">
                      Date Posted
                    </p>
                    {index < reviews.length - 1 && (
                      <div className="h-[1px] bg-black/30 my-4"></div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query PressPageQuery {
    contentfulHomePage {
      reviews {
        articleLink
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
    contentfulContactPage {
      email
      address
    }
    contentfulFooterContent {
      socialInstagram
      socialTiktok
      socialTwitter
      youtube
    }
    contentfulFinancingPage {
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        description
      }
    }
  }
`;
