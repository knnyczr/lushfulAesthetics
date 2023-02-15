import React from "react";
import { graphql, Link } from "gatsby";
import CategoryFeaturedPost from "../components/blog/CategoryFeaturedPost";
import CategoryFeaturedServices from "../components/blog/CategoryFeaturedServices";
import CategoryBlogFeed from "../components/blog/CategoryBlogFeed";

export default function BlogCategory({ data }) {
  const {
    contentfulBlogCategory: {
      categoryTitle,
      blogPosts,
      featuredPost,
      featuredServices,
    },
  } = data;

  return (
    <div className="sm:px-0 md:px-5">
      <button className="font-medium uppercase ml-4 my-2 md:ml-0 lg:ml-20">
        <Link to="/blog">{`← Return to all posts`}</Link>
      </button>
      <div className="grid grid-cols-1 md:grid-rows-2 sm:gap-10 md:grid-cols-4 md:gap-1 lg:px-20 lg:gap-10">
        <CategoryFeaturedPost
          categoryTitle={categoryTitle}
          featuredPost={featuredPost}
        />
        <CategoryFeaturedServices featuredServices={featuredServices} />
        <CategoryBlogFeed blogPosts={blogPosts} />
      </div>
    </div>
  );
}

export const BlogCategoryQuery = graphql`
  query blogCategoryQuery($blogCategory: String!) {
    contentfulBlogCategory(id: { eq: $blogCategory }) {
      categoryTitle
      blogPosts {
        intro
        heroImage {
          url
        }
        category {
          slug
        }
        title
        uniqueIdentifier
        datePosted
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
