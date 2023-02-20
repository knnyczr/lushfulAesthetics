import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { formatDate } from "../hooks/format-date";
import Categories from "../components/blog/Categories";
import CategoryFeaturedServices from "../components/blog/CategoryFeaturedServices";

export default function BlogPost({ data }) {
  const {
    contentfulBlogPost: {
      title,
      intro,
      article,
      author,
      category,
      datePosted,
      featuredServices,
      heroImage,
      uniqueIdentifier,
    },
  } = data;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="font-sans">{children}</p>;
      },
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="py-4 text-2xl font-bold my-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="py-3 text-xl font-bold my-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className="py-2 text-lg font-bold my-2">{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return <h4 className="py-2 font-bold my-1">{children}</h4>;
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return <h5 className="py-2 font-bold my-1">{children}</h5>;
      },
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <div className="px-4 py-6 my-4 font-serif text-lg italic font-bold bg-main-green text-white">
            {children}
          </div>
        );
      },
      [BLOCKS.HR]: (node) => <hr className="py-2 opacity-0" />,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="flex flex-col justify-center list-disc">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="flex flex-col justify-center list-decimal">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="font-serif font-medium h-auto mx-6 my-1">{children}</li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        console.log(node.data.target);
        const { gatsbyImageData, description } = node.data.target;
        return (
          <GatsbyImage image={getImage(gatsbyImageData)} alt={description} />
        );
      },
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
          className="underline "
          href={data.uri ? data.uri : ""}
          target={`${
            data.uri.startsWith(
              "https://www.lushfulaesthetics" ||
                "https://lushfulaesthetics-blog-branch.netlify.app" ||
                "http://localhost:8000/"
            )
              ? "_self"
              : "_blank"
          }`}
          rel={`${
            data.uri.startsWith(
              "https://www.lushfulaesthetics" ||
                "https://lushfulaesthetics-blog-branch.netlify.app" ||
                "http://localhost:8000/"
            )
              ? ""
              : "noopener noreferrer"
          }`}
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 lg:py-16 flex flex-col justify-center items-center">
        <h5 className="">{category.categoryTitle}</h5>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold my-4 lg:my-5">
          {title}
        </h2>
        <p>By {author}</p>
        <p>Posted on {formatDate(datePosted)}</p>
        <div
          style={{
            backgroundImage: `url(${heroImage.url})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `50% 50%`,
          }}
          className="h-[20rem] lg:h-[30rem] w-full my-6"
        ></div>
      </div>
      <div className="grid grid-cols-1 mb-6 md:grid-cols-4 md:mb-12 lg:grid-rows-2 lg:mb-16">
        <div className="px-4 py-4 md:col-span-3 md:row-span-2 md:px-12 lg:px-24">
          <div>
            <p className="font-bold">{intro}</p>
          </div>
          <div className="h-[0.0625rem] bg-black my-4 lg:my-6" />
          <div> {renderRichText(article, options)}</div>
        </div>
        <div className="py-4 px-4 order-3 md:pr-24 md:col-start-4 md:order-last">
          <div className="h-0.5 bg-black mb-4" />
          <Categories categories={data.allContentfulBlogCategory.edges} />
        </div>
        <div className="px-4 order-2 md:order-last md:row-auto">
          <CategoryFeaturedServices featuredServices={featuredServices} />
        </div>
      </div>
    </>
  );
}

export const BlogPostQuery = graphql`
  query blogPageQuery($pageId: String!) {
    contentfulBlogPost(uniqueIdentifier: { eq: $pageId }) {
      heroImage {
        id
        url
      }
      title
      datePosted
      author
      intro
      uniqueIdentifier
      category {
        slug
        categoryTitle
      }
      article {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1000)
            __typename
          }
        }
      }
      featuredServices {
        slug
        serviceTitle
        intro {
          raw
        }
        heroImage {
          url
        }
      }
    }
    allContentfulBlogCategory {
      edges {
        node {
          slug
          categoryTitle
          blogPosts {
            title
            uniqueIdentifier
          }
        }
      }
    }
  }
`;
