import React from "react";
import { graphql } from "gatsby";
import CustomAccordion from "../components/CustomAccodian";
import HeroImage from "../components/HeroImage";
import ServicePrice from "../components/ServicePrice";
import PrePostCare from "../components/PrePostCare";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import servicePageOptions from "../helpers/servicePageOptions";
import OurApproach from "../components/OurApproach";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export { Head } from "../components/Layout";

export default function ServicePage({ data }) {
  const {
    contentfulServicePage: {
      serviceTitle,
      faqRef,
      pricing,
      intro,
      press,
      heroImage,
      ourApproach,
      preCare,
      postCare,
      pageMetaDescription,
      subheadingOne,
      subheadingTwo,
      subheadingAsSeenIn,
      pageMetaTitle,
    },
  } = data;

  const website_url = useSiteMetadata().siteUrl;
  const useSiteMetaTitle = useSiteMetadata().title;
  const options = servicePageOptions(website_url);

  return (
    <div className="mx-auto max-w-[1536px]">
      <Helmet>
        <title>
          {pageMetaTitle || `${useSiteMetaTitle} | ${serviceTitle}`}
        </title>
        {pageMetaDescription && (
          <meta name="description" content={`${pageMetaDescription}`}></meta>
        )}
      </Helmet>

      <HeroImage heroImage={heroImage} pageTitle={serviceTitle} />

      <ServicePrice
        intro={renderRichText(intro, options)}
        pricing={renderRichText(pricing, options)}
        subheadingOne={subheadingOne}
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

      <div className="px-4 py-16 sm:px-6 lg:px-24 lg:py-12 xl:py-12">
        <div className="container my-4 px-4 md:px-6 lg:px-24 mx-auto">
          <h2 className="container font-serif font-bold text-3xl my-4 ">
            FAQs
          </h2>

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
    </div>
  );
}

function AsSeenIn({ press, subheadingAsSeenIn, asSeenInSubheading }) {
  return (
    <>
      <div className="px-4 pb-16 flex flex-col justify-start sm:px-6 md:justify-center lg:px-24 lg:pb-24">
        <div className="flex items-center mb-6">
          <h2 className="font-serif text-2xl pr-6 lg:text-3xl font-bold md:mb-2">
            {subheadingAsSeenIn}
          </h2>
          <div className="flex-1 h-px bg-black mr-10" />
        </div>
        <div
          className="flex flex-col mx-auto md:flex-row lg:flex-row"
          style={{ maxWidth: `676px` }}
        >
          {press.map((obj) => {
            const {
              articleTitle,
              url,
              companyLogo: { companyName, companyLogo },
            } = obj;
            const image = getImage(companyLogo);

            return (
              <div className="flex items-center justify-center">
                <a
                  key={`${companyName}: ${articleTitle}`}
                  href={`${url}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${companyName}: ${articleTitle}`}
                >
                  <GatsbyImage
                    image={image}
                    className="mr-6"
                    alt={`${companyName}: ${articleTitle}`}
                  />
                </a>
              </div>
            );
          })}
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
      subheadingOne
      subheadingTwo
      pageMetaDescription
      serviceTitle
      pageMetaTitle
    }
  }
`;
