import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useContentfulImage } from "gatsby-source-contentful/hooks";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function ServicePage({ data }) {
  console.log("here is page data in service : ", data);
  const {
    serviceTitle,
    faqRef,
    pricing,
    heroImage,
    ourApproach,
    preCare,
    postCare,
  } = data.contentfulServicePage;

  const dynamicImage = useContentfulImage({
    image: {
      url:
        heroImage.gatsbyImageData.images.sources[0].srcSet ||
        heroImage.gatsbyImageData.images.fallback.srcSet,
      width: 2000,
      height: 1000,
    },
  });

  // TODO: renderRichText article: https://www.gatsbyjs.com/blog/how-to-use-the-contentful-rich-text-field-with-gatsby/

  return (
    <div>
      {data?.contentfulServicePage && (
        <>
          <GatsbyImage image={dynamicImage} alt={heroImage.description} />
          <h1>{serviceTitle}</h1>
          <h2>{`What Is It For?`}</h2>
          <div>{renderRichText(pricing)}</div>
          <div>{renderRichText(ourApproach)}</div>
          <div>{renderRichText(preCare)}</div>
          <div>{renderRichText(postCare)}</div>

          {faqRef.map((faq) => (
            <>
              <div>{faq.question}</div>
              <div>{renderRichText(faq.answer)}</div>
            </>
          ))}
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
