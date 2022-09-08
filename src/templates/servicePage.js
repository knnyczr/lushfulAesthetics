import React from "react";
import { graphql } from "gatsby";
import CustomAccordion from "../components/CustomAccodian";
import HeroImage from "../components/HeroImage";
import ServicePrice from "../components/ServicePrice";
import PrePostCare from "../components/PrePostCare";

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

  return (
    <div>
      {data?.contentfulServicePage && (
        <>
          <HeroImage heroImage={heroImage} pageTitle={serviceTitle} />

          {ourApproach && pricing && (
            <ServicePrice
              ourApproach={<RenderRichTextComponent richText={ourApproach} />}
              pricing={
                <RenderRichTextComponent
                  richText={pricing}
                  string={"pricing"}
                />
              }
            />
          )}

          {/* <PrePostCare
            preCare={<RenderRichTextComponent richText={preCare} />}
            postCare={<RenderRichTextComponent richText={postCare} />}
            heroImage={heroImage}
          /> */}

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
