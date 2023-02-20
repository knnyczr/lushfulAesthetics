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

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="font-sans font-bold lg:text-lg mb-1">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="font-sans my-4">{children}</p>;
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
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <p className="px-4 py-[1px] font-serif text-lg italic bg-main-green">
            {children}
          </p>
        );
      },
      [BLOCKS.HR]: (node) => <hr className="py-2 opacity-0" />,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="flex flex-col md:flex-row justify-center">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="py-8 px-4 my-2 h-auto align-middle md:py-10 md:px-8 md:h-auto bg-white mx-2 rounded md:w-1/4 text-center font-serif font-medium ">
          {children}
        </li>
      ),
      // [INLINES.HYPERLINK]: ({ data }, children) => (
      //   <a
      //     className="underline "
      //     href={data.uri ? data.uri : ""}
      //     target={`${
      //       data.uri.startsWith(website_url || "http://localhost:8000/")
      //         ? "_self"
      //         : "_blank"
      //     }`}
      //     rel={`${
      //       data.uri.startsWith(website_url) ? "" : "noopener noreferrer"
      //     }`}
      //   >
      //     {children}
      //   </a>
      // ),
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
