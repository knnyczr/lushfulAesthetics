import React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
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
    contentfulReviewsPage: { featuredAestheticServices },
    googlePlacesPlace: { childrenGooglePlacesReview },

    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
    },

    contentfulPressPage: { email },
  } = data;

  const reviewsPageData = data.contentfulReviewsPage;

  return (
    <>
      {/* Featured Reviews */}
      <div className="relative flex justify-between items-center mx-auto max-w-[1536px] ">
        <FeaturedReviews data={reviewsPageData} />
      </div>

      {/* page content here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1536px]  pt-8 mx-auto ">
        <div className="  lg:pr-16 lg:col-span-2 py-4 px-4 pt-4 md:flex-1 md:px-12 lg:px-24 2xl:pl-0">
          {" "}
          <PatientReviews
            childrenGooglePlacesReview={childrenGooglePlacesReview}
          />
        </div>

        {/* right side */}
        <div className=" py-4 2xl:pr-0 px-4 pt-4 pb-12 md:flex-1 md:px-12 lg:px-24 lg:pl-0">
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
                <p>
                  18 E 41st St 14th Floor,
                  <br /> New York, NY 10017
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Aesthetic Services */}
      <div className="flex flex-col justify-between items-start md:items-center mx-auto max-w-[1536px] lg:mt-16 w-full py-8 px-4 pb-12 md:px-12 lg:px-24">
        <div className="font-sans uppercase text-[20px] lg:text-2xl mb-6 lg:mb-12">
          Discover Our Featured Aesthetic Services
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 w-full">
          {featuredAestheticServices.map((service, index) => {
            const extractPlainText = (node) => {
              if (node.nodeType === "text") return node.value;
              if (node.content)
                return node.content.map(extractPlainText).join("");
              return "";
            };

            let shortText = "";
            try {
              const parsed = JSON.parse(service.intro.raw);
              const fullText = extractPlainText(parsed);
              shortText =
                fullText.length > 250 ? fullText.slice(0, 250) + "…" : fullText;
            } catch (err) {
              console.error("Error parsing intro rich text", err);
            }
            console.log(service);
            return (
              <Link to={`/${service.slug}`} key={index} className="block">
                <div className="flex flex-col hover:opacity-90 transition-opacity">
                  <div
                    style={{
                      backgroundImage: `url(${service.heroImage.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    className="w-full aspect-[3/2] mb-4"
                  />
                  <h2 className="text-2xl mb-2">{service.serviceTitle}</h2>
                  <p className="text-sm text-gray-700">{shortText}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ReviewsPageQuery {
    contentfulReviewsPage {
      metaTitle
      metaDescription
      pageTitle
      reviewerName
      reviewerName2
      reviewerName3
      reviewerName4
      reviewContent {
        reviewContent
      }
      reviewContent2 {
        reviewContent2
      }
      reviewContent3 {
        reviewContent3
      }
      reviewContent4 {
        reviewContent4
      }
      heroimage {
        url
      }
      featuredAestheticServices {
        heroImage {
          url
        }
        intro {
          raw
        }
        serviceTitle
        slug
      }
    }
    googlePlacesPlace {
      childrenGooglePlacesReview {
        author_name
        text
        rating
        time
        relative_time_description
      }
    }
    contentfulPressPage {
      email
    }
    contentfulFooterContent {
      socialInstagram
      socialTiktok
      socialTwitter
      youtube
    }
  }
`;
