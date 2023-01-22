import React from "react";
import { graphql, Link } from "gatsby";

export default function BlogCategory({ data }) {
  const {
    contentfulBlogCategory: { categoryTitle, blogPosts },
  } = data;
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
  query blogCategoryQuery($pageId: String!) {
    contentfulBlogCategory(id: { eq: $pageId }) {
      categoryTitle
      blogPosts {
        uniqueIdentifier
        title
      }
    }
  }
`;
