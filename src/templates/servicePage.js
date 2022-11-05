import React from "react";
import { graphql } from "gatsby";
import CustomAccordion from "../components/CustomAccodian";
import HeroImage from "../components/HeroImage";
import ServicePrice from "../components/ServicePrice";
import PrePostCare from "../components/PrePostCare";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import OurApproach from "../components/OurApproach";
import { Helmet } from "react-helmet";

export { Head } from "../components/Layout";

export default function ServicePage({ data }) {
  const {
    contentfulServicePage: {
      serviceTitle,
      faqRef,
      pricing,
      intro,
      heroImage,
      ourApproach,
      preCare,
      postCare,
    },
  } = data;

  const website_url = "https://www.lushfulaesthetics.com/";

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <div className="mb-4">
          <p className="font-serif">{children}</p>
        </div>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="pt-4">{children}</h2>
      ),
      [BLOCKS.HR]: (node) => <hr className="py-2 opacity-0" />,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="ml-4 italic">{children}</ul>
      ),
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
          className="underline "
          href={data.uri ? data.uri : ""}
          target={`${
            data.uri.startsWith(website_url || "http://localhost:8000/")
              ? "_self"
              : "_blank"
          }`}
          rel={`${
            data.uri.startsWith(website_url) ? "" : "noopener noreferrer"
          }`}
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div>
      <Helmet title={`Lushful Aesthetics | ${serviceTitle}`} />
      <HeroImage heroImage={heroImage} pageTitle={serviceTitle} />

      <ServicePrice
        intro={renderRichText(intro, options)}
        pricing={renderRichText(pricing, options)}
      />

      <OurApproach ourApproach={renderRichText(ourApproach, options)} />

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
      serviceTitle
    }
  }
`;

// "id": "cde0765b-6fff-5a8b-9eb7-422ec0ddf15f",
// "slug": "aesthetic-services/facial-treatments/botox"
