import React, { useState, useEffect } from "react";

import { useLocation } from "@reach/router";

import { graphql } from "gatsby";
import CustomAccordion from "../components/CustomAccodian";
import HeroImage from "../components/HeroImage";
import ServicePrice from "../components/ServicePrice";
import PrePostCare from "../components/PrePostCare";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import servicePageOptions from "../helpers/servicePageOptions";
import OurApproach from "../components/OurApproach";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import BeforeAndAfterContainer from "../components/beforeAndAfter/BeforeAndAfterContainer";
import AgeAndEmailCaptureModal from "../components/beforeAndAfter/AgeAndEmailCaptureModal";

export { Head } from "../components/Layout";

export default function ServicePage({ data }) {
  const {
    contentfulServicePage: {
      slug,
      serviceTitle,
      faqRef,
      faqSchema,
      pricing,
      pricingHeading,
      pricingSlug,
      intro,
      press,
      heroImage,
      ourApproach,
      preCare,
      postCare,
      metaDescription,
      subheadingOne,
      subheadingTwo,
      subheadingAsSeenIn,
      metaTitle,
      beforeAfterVideos,
      beforeAndAfters,
      beforeAfterServiceDescriptionRichText,
      shouldCaptureEmail,
      shouldVerifyAge,
    },
  } = data;

  const website_url = useSiteMetadata().siteUrl;

  const options = servicePageOptions(website_url);

  const location = useLocation();

  const [isVerifyAgePopupOpen, setIsVerifyAgePopupOpen] = useState({
    isOpen: false,
    flags: {
      shouldVerifyAge,
      shouldCaptureEmail,
    },
  });

  const handleVerifyAge = () => {
    setIsVerifyAgePopupOpen({
      ...isVerifyAgePopupOpen,
      isOpen: true,
    });
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!hasScrolled && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      setTimeout(() => {
        setHasScrolled(true);
        if (element) {
          const yOffset =
            element.getBoundingClientRect().top + window.scrollY - 200;
          window.scrollTo({ top: yOffset, behavior: "smooth" });
        }
      }, 2000);
    }
  }, [location, hasScrolled]);

  return (
    <div className="mx-auto max-w-[1536px]">
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        faqSchema={faqSchema}
      />
      <HeroImage heroImage={heroImage} pageTitle={serviceTitle} />

      <ServicePrice
        intro={renderRichText(intro, options)}
        pricing={renderRichText(pricing, options)}
        subheadingOne={subheadingOne}
        slug={slug}
        pricingHeading={pricingHeading}
        pricingSlug={pricingSlug}
      />
      {press?.length && (
        <AsSeenIn press={press} subheadingAsSeenIn={subheadingAsSeenIn} />
      )}
      <OurApproach
        subheadingTwo={subheadingTwo}
        ourApproach={renderRichText(ourApproach, options)}
      />
      <PrePostCare
        preCare={preCare}
        postCare={postCare}
        heroImage={heroImage}
      />

      {/* BEFORE & AFTERS FEATURES */}
      {(beforeAfterVideos || beforeAndAfters) && (
        <BeforeAndAfterContainer
          serviceTitle={serviceTitle}
          beforeAfterVideos={beforeAfterVideos}
          beforeAfterServiceDescriptionRichText={
            beforeAfterServiceDescriptionRichText
          }
          beforeAndAfters={beforeAndAfters}
          onVerifyAge={handleVerifyAge}
          shouldVerifyAge={isVerifyAgePopupOpen.flags.shouldVerifyAge}
          shouldCaptureEmail={isVerifyAgePopupOpen.flags.shouldCaptureEmail}
        />
      )}

      {isVerifyAgePopupOpen.isOpen && (
        <AgeAndEmailCaptureModal
          heroImage={heroImage}
          isVerifyAgePopupOpen={isVerifyAgePopupOpen}
          setIsVerifyAgePopupOpen={setIsVerifyAgePopupOpen}
          serviceTitle={serviceTitle}
          shouldCaptureEmail={isVerifyAgePopupOpen.flags.shouldCaptureEmail}
          shouldVerifyAge={isVerifyAgePopupOpen.flags.shouldVerifyAge}
        />
      )}
      <div className="px-4 py-16 sm:px-6 lg:px-24 lg:py-12 xl:py-12">
        <h2 className="container font-serif font-bold text-3xl my-4 ">FAQs</h2>

        {faqRef.map((faq, idx) => (
          <CustomAccordion
            key={idx}
            index={idx}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}

function AsSeenIn({ press, subheadingAsSeenIn }) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-24 pb-16 lg:pb-24 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-6">
          {subheadingAsSeenIn && (
            <h2 className="font-serif text-2xl lg:text-3xl font-bold whitespace-nowrap">
              {subheadingAsSeenIn}
            </h2>
          )}
          <div className="h-px bg-black w-full" />
        </div>
        <div className="pt-5 flex flex-col gap-10">
          <div className="flex mx-auto flex-wrap items-center justify-around gap-10 w-full">
            {press.map((obj) => {
              const {
                articleTitle,
                url,
                companyLogo: { companyName, companyLogo },
              } = obj;
              const image = getImage(companyLogo);

              return (
                <div
                  key={`${companyName}: ${articleTitle}`}
                  className="w-[calc(100%/5)] max-w-[150px] min-w-0"
                >
                  <a
                    href={`${url}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${companyName}: ${articleTitle}`}
                  >
                    <GatsbyImage
                      image={image}
                      className=""
                      alt={`${companyName}: ${articleTitle}`}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query servicePageQuery($servicePageId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulServicePage(id: { eq: $servicePageId }) {
      slug
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90)
        description
      }
      faqRef {
        answer {
          raw
        }
        question
      }
      faqSchema {
        internal {
          content
        }
      }
      intro {
        raw
      }
      subheadingAsSeenIn
      press {
        articleTitle
        url
        companyLogo {
          companyName
          companyLogo {
            publicUrl
            gatsbyImageData(width: 200, quality: 90)
          }
        }
      }
      ourApproach {
        raw
      }
      postCare {
        raw
      }
      preCare {
        raw
      }
      pricing {
        raw
      }
      pricingHeading
      pricingSlug
      subheadingOne
      subheadingTwo
      metaDescription
      serviceTitle
      metaTitle
      shouldCaptureEmail
      shouldVerifyAge
      beforeAfterServiceDescriptionRichText {
        raw
      }
      beforeAfterVideos
      beforeAndAfters {
        afterImageDescription
        beforeImageDescription
        before {
          id
          gatsbyImageData
          title
        }
        after {
          id
          gatsbyImageData
          title
        }
      }
    }
  }
`;
