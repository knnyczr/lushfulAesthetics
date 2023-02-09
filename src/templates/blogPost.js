import { graphql } from "gatsby";
import React from "react";
import ShareButton from "../components/ShareButton";

export default function BlogPost({ data }) {
  console.log("🧱 Blog Post data: ", data);

  const {
    contentfulBlogPost: { title, intro, category, uniqueIdentifier },
  } = data;
  return (
    <>
      <h1>hello from blog post: {title}</h1>
      <p>{intro}</p>
      <ShareButton
        category={category.slug}
        uniqueIdentifier={uniqueIdentifier}
      />
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
        }
      }
    }
  }
`;
