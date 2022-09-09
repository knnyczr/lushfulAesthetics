import React from "react";
import { graphql } from "gatsby";
import CustomAccordion from "../components/CustomAccodian";
import HeroImage from "../components/HeroImage";
import ServicePrice from "../components/ServicePrice";
import PrePostCare from "../components/PrePostCare";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

import RenderRichTextComponent from "../components/RenderRichText";

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

  // TODO: renderRichText article: https://www.gatsbyjs.com/blog/how-to-use-the-contentful-rich-text-field-with-gatsby/
  // console.log(renderRichText(intro));
  console.log(ourApproach, preCare, postCare, pricing);

  const website_url = "https://www.lushfulaesthetics.com/";

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={`${"font-serif"}`}>{children}</p>
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
      {data?.contentfulServicePage && (
        <>
          <HeroImage heroImage={heroImage} pageTitle={serviceTitle} />

          <ServicePrice
            ourApproach={renderRichText(ourApproach, options)}
            pricing={renderRichText(pricing, options)}
          />

          <PrePostCare
            preCare={renderRichText(preCare, options)}
            postCare={renderRichText(postCare, options)}
            heroImage={heroImage}
          />

          <div>
            <h2 className="font-serif font-extrabold text-2xl">FAQs</h2>
            <div data-accordion="collapse" className="accordion">
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
        </>
      )}
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
        gatsbyImageData(layout: FULL_WIDTH)
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
