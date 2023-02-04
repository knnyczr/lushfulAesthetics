import React from "react";
import { graphql, Link } from "gatsby";
import CategoryFeaturedPost from "../components/blog/CategoryFeaturedPost";
import CategoryFeaturedServices from "../components/blog/CategoryFeaturedServices";

export default function BlogCategory({ data }) {
  const {
    contentfulBlogCategory: {
      categoryTitle,
      blogPosts,
      featuredPost,
      featuredServices,
    },
  } = data;

  console.log("🧱 Blog Category data ", data);

  return (
    <>
      <button className="ml-4 my-2">{`← BACK`}</button>
      <div className="grid grid-cols-1 sm:gap-10 md:grid-cols-3 md:gap-0">
        <CategoryFeaturedPost
          categoryTitle={categoryTitle}
          featuredPost={featuredPost}
        />
        <CategoryFeaturedServices featuredServices={featuredServices} />
      </div>
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
        uniqueIdentifier
        intro
        category {
          slug
        }
        heroImage {
          url
        }
        title
        datePosted
      }
      featuredServices {
        slug
        intro {
          raw
        }
        serviceTitle
        heroImage {
          url
        }
      }
    }
  }
`;
