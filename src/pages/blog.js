import { graphql, Link } from "gatsby";
import React from "react";

export default function Blog({ data }) {
  console.log(data);
  return (
    <>
      <h1>Blog</h1>
      {data.allContentfulBlogCategory.edges.map((category) => {
        return (
          <>
            <Link to={`${category.node.slug}`}>
              {category.node.categoryTitle}
            </Link>
            {category.node.blogPosts.map((post) => (
              <li>
                {`=>`}{" "}
                <Link to={`${category.node.slug}/${post.uniqueIdentifier}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </>
        );
      })}
    </>
  );
}

export const pageQuery = graphql`
  query blogPageQuery {
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
