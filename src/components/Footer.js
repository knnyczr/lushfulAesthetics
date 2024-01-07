import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Logo from "../images/logo-footer.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const {
    contentfulFooterContent: {
      disclosure,
      generalFaq,
      hipaaPolicy,
      privacyPolicy,
      socialInstagram,
      socialTwitter,
      socialTiktok,
      youtube,
      copyright,
      bookNowLink,
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
        hipaaPolicy {
          slug
        }
        privacyPolicy {
          slug
        }
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
                  className="mr-6 mb-4"
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:black"
                    icon={faTwitter}
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
                  >
                    <FontAwesomeIcon
                      className="fa-2x hover:black"
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
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:black"
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
                >
                  <FontAwesomeIcon
                    className="fa-2x hover:black"
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
                <Link to={`/${privacyPolicy.slug}`}>Privacy Policy</Link>
              </span>
              <span className="mr-4">
                <Link to={`/${hipaaPolicy.slug}`}>HIPAA Policy</Link>
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
      <script
        src="https://js.adsrvr.org/up_loader.1.1.0.js"
        type="text/javascript"
      />
      <script type="text/javascript">
        {`
          ttd_dom_ready( 
            function() { 
              if (typeof TTDUniversalPixelApi === 'function') { 
                var universalPixelApi = new TTDUniversalPixelApi(); universalPixelApi.init("t2f05ni", ["yekzz77"], "https://insight.adsrvr.org/track/up");
              } 
            }
          )
        `}
      </script>
    </>
  );
}
