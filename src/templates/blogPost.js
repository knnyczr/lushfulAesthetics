import { graphql } from "gatsby";
import React from "react";

export default function BlogPost({ pageContext }) {
  //   console.log(pageContext);
  return (
    <>
      <h1>hello from blog post</h1>
    </>
  );
}

export const BlogPostQuery = graphql`
  query blogPageQuery($pageId: String!) {
    contentfulBlogPost(uniqueIdentifier: { eq: $pageId }) {
      title
    }
  }
`;
