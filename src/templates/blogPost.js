import { graphql } from "gatsby";
import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { formatDate } from "../hooks/format-date";
import Categories from "../components/blog/Categories";

export default function BlogPost({ data }) {
  console.log("🧱 Blog Post data: ", data);

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

  // console.log("image", featuredServices[0].heroImage.url);
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
      [BLOCKS.HEADING_1]: (node, children) => (
        <h2 className="pt-4">{children}</h2>
      ),
      [BLOCKS.HR]: (node) => <hr className="py-2 opacity-0" />,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="ml-4 italic">{children}</ul>
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
            backgroundImage: `url(${featuredServices[0].heroImage.url})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `50% 50%`,
          }}
          className="h-[20rem] lg:h-[30rem] w-full my-6"
        ></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 md:mb-12 lg:mb-16">
        <div className="md:col-span-2 md:px-12 lg:px-24 px-4 py-4">
          <div>
            <p className="font-bold">{intro}</p>
          </div>
          <div className="h-[0.0625rem] bg-black my-4 lg:my-6" />
          <div> {renderRichText(article)}</div>
        </div>
        <div className="md:col-span-1 md:pr-24 py-4 px-4 ">
          <div className="h-0.5 bg-black mb-4" />
          <Categories categories={data.allContentfulBlogCategory.edges} />
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
          url
        }
      }
      featuredServices {
        slug
        heroImage {
          id
          title
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
