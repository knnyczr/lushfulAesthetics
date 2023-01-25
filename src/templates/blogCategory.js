import React from "react";
import { graphql, Link } from "gatsby";

export default function BlogCategory({ data }) {
  const {
    contentfulBlogCategory: { categoryTitle, blogPosts },
  } = data;

  console.log("🧱 Blog Category data ", data);

  return (
    <>
      <h1>{categoryTitle}</h1>
      {blogPosts.map((page) => (
        <li key={page.uniqueIdentifier}>
          <Link to={`${page.uniqueIdentifier}`}>{page.title}</Link>
        </li>
      ))}
    </>
  );
}

export const BlogCategoryQuery = graphql`
  query blogCategoryQuery($blogCategory: String!) {
    contentfulBlogCategory(id: { eq: $blogCategory }) {
      categoryTitle
      blogPosts {
        intro
        heroImage {
          id
        }
        title
        uniqueIdentifier
      }
      featuredPost {
        heroImage {
          id
        }
        title
        datePosted
      }
      featuredServices {
        slug
        serviceTitle
        heroImage {
          id
        }
      }
    }
  }
`;
