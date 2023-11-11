import React from "react";
import { graphql, Link } from "gatsby";
import CategoryFeaturedPost from "../components/blog/CategoryFeaturedPost";
import CategoryFeaturedServices from "../components/blog/CategoryFeaturedServices";
import CategoryBlogFeed from "../components/blog/CategoryBlogFeed";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";

export default function BlogCategory({ data }) {
  const {
    contentfulBlogCategory: {
      categoryTitle,
      blogPosts,
      featuredPost,
      featuredServices,
      metaTitle,
      metaDescription,
    },
  } = data;

  return (
    <div className="sm:px-0 md:px-5">
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <button className="font-medium uppercase ml-4 mt-12 mb-6 md:ml-0 lg:ml-20">
        <Link to="/blog">{`← Return to all posts`}</Link>
      </button>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8 lg:px-20 lg:gap-10">
        <CategoryFeaturedPost
          categoryTitle={categoryTitle}
          featuredPost={featuredPost}
        />
        <div className="order-last px-4 md:order-2 md:col-start-4 md:px-2 md:row-span-2">
          <CategoryFeaturedServices featuredServices={featuredServices} />
        </div>
        <CategoryBlogFeed blogPosts={blogPosts} />
      </div>
    </div>
  );
}

export const BlogCategoryQuery = graphql`
  query blogCategoryQuery($blogCategory: String!) {
    contentfulBlogCategory(id: { eq: $blogCategory }) {
      categoryTitle
      metaTitle
      metaDescription
      blogPosts {
        intro
        heroImage {
          url
        }
        category {
          slug
        }
        title
        slug
        datePosted
      }
      featuredPost {
        slug
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
