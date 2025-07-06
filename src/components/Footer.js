import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Logo from "../images/logo-footer.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const {
    contentfulFooterContent: {
      disclosure,
      generalFaq,
      socialInstagram,
      socialTwitter,
      socialTiktok,
      youtube,
      copyright,
      bookNowLink,
      privacyPolicySlug,
      hipaaSlug,
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      contentfulFooterContent {
        disclosure {
          raw
        }
        generalFaq {
          slug
        }
        privacyPolicySlug
        hipaaSlug
        copyright
        socialInstagram
        socialTwitter
        socialTiktok
        youtube
        bookNowLink
      }
    }
  `);

  return (
    <>
      <div className="bg-main-green text-white lg:px-24 lg:pt-12 md:px-12 md:pt-12 md:pb-4 px-4 py-4">
        <div className="max-w-[1536px] mx-auto">
          <div className="flex xl:flex-row lg:justify-between flex-col">
            <div className="flex lg:flex-row lg:justify-between flex-col">
              <div className="md:pb-8 pr-8 py-4 lg:pr-16 ">
                <div className="w-80">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
              </div>

              <div className="lg:pr-32 md:pr-16 md:pb-8 py-4">
                <h2 className="mb-6 text-xl font-serif uppercase">Support</h2>
                <div className="font-medium md:text-lg flex flex-row ">
                  <div className="flex flex-col mr-8">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Book an appointment (opens in a new tab)"
                      href={`${bookNowLink}`}
                      className="hover:underline mr-4 mb-4"
                    >
                      Book an appointment
                    </a>
                    <Link to="/about" className="hover:underline mr-4 mb-4">
                      About
                    </Link>
                  </div>
                  <div className="flex flex-col ">
                    <Link
                      to={`/${generalFaq.slug}/`}
                      className="hover:underline mr-4 mb-4 "
                    >
                      FAQs
                    </Link>
                    <Link to="/contact" className="hover:underline mr-4 mb-4">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-end py-4 md:pb-4">
              {socialTwitter && socialTwitter.startsWith("https://www.") && (
                <a
                  href={`${socialTwitter}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Twitter (opens in a new tab)"
                  className="mr-6 mb-4"
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:text-black"
                    icon={faXTwitter}
                  />
                </a>
              )}
              {socialInstagram &&
                socialInstagram.startsWith("https://www.") && (
                  <a
                    href={`${socialInstagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mr-6 mb-4"
                    aria-label="Follow us on Instagram (opens in a new tab)"
                  >
                    <FontAwesomeIcon
                      className="fa-2x hover:text-black"
                      icon={faInstagram}
                    />
                  </a>
                )}

              {socialTiktok && socialTiktok.startsWith("https://www.") && (
                <a
                  href={`${socialTiktok}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-6 mb-4"
                  aria-label="Follow us on Tiktok (opens in a new tab)"
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:text-black"
                    icon={faTiktok}
                  />
                </a>
              )}

              {youtube && youtube.startsWith("https://www.") && (
                <a
                  href={`${youtube}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-6 mb-4"
                  aria-label="Follow us on Tiktok (opens in a new tab)"
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:text-black"
                    icon={faYoutube}
                  />
                </a>
              )}
            </div>
          </div>
          <hr className="my-6 border-white" />
          <div className="bg-main-green md:text-lg flex flex-row justify-between text-white font-serif ">
            {renderRichText(disclosure)}
          </div>
          <hr className="my-6 border-white" />

          <div className="flex flex-col justify-center text-sm md:text-base md:flex-row pb-8 md:pb-2">
            <div className="py-4 md:py-0">
              <span className="mr-4">
                <Link to={`/${privacyPolicySlug}`}>Privacy Policy</Link>
              </span>
              <span className="mr-4">
                <Link to={`/${hipaaSlug}`}>HIPAA Policy</Link>
              </span>
            </div>

            <span>{copyright}</span>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center md:flex-row">
          <span>
            {`Designed and Built by `}{" "}
            <a className="underline" href="https://knnyczr.com/">
              Kenny Cruz
            </a>
            {` & `}{" "}
            <a className="underline" href="https://yusong.space/">
              Yusong Shi
            </a>
          </span>
        </div> */}
      </div>
    </>
  );
}
