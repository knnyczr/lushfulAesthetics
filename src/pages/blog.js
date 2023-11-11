import React from "react";
import { graphql } from "gatsby";

import BlogCardDesktop from "../components/blog/blogCards/BlogCardDesktop";
import BlogCardMobile from "../components/blog/blogCards/BlogCardMobile";
import Categories from "../components/blog/Categories";
import FeaturedPost from "../components/blog/FeaturedPost";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";

// import SearchBar from "../components/blog/SearchBar";

export default function Blog({ data }) {
  const {
    contentfulBlogHomepage: {
      featuredPost,
      facialAestheticHeroes,
      bodyAestheticHeroes,
      sexualEnhancementHeroes,
      metaTitle,
      metaDescription,
    },
  } = data;

  const categories = [
    facialAestheticHeroes,
    bodyAestheticHeroes,
    sexualEnhancementHeroes,
  ];

  return (
    <div>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <FeaturedPost featuredPost={featuredPost} />
      {/* <SearchBar /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1536px] mx-auto">
        <div className="md:col-start-3 md:pr-24 py-4 px-4 2xl:pr-0">
          <div className="h-0.5 bg-black mb-4" />
          <Categories categories={data.allContentfulBlogCategory.edges} />
        </div>

        <div className="md:row-start-1 md:px-12 lg:px-24 2xl:pl-0 md:col-span-2 px-4 py-4">
          <div className="hidden w-full h-auto md:flex md:flex-col">
            <BlogCardDesktop
              categories={categories}
              // facialCategory={facialAestheticHeroes}
              // bodyCategory={bodyAestheticHeroes}
              // sexualCategory={sexualEnhancementHeroes}
            />
          </div>
          <div className="md:hidden flex flex-col h-auto">
            <BlogCardMobile
              categories={categories}
              // facialCategory={facialAestheticHeroes}
              // bodyCategory={bodyAestheticHeroes}
              // sexualCategory={sexualEnhancementHeroes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query blogPageQuery {
    contentfulBlogHomepage {
      metaTitle
      metaDescription
      featuredPost {
        heroImage {
          id
          title
          url
        }
        category {
          categoryTitle
          slug
        }
        datePosted
        intro
        title
        slug
      }

      bodyAestheticHeroes {
        intro
        heroImage {
          id
          url
        }
        datePosted
        title
        category {
          categoryTitle
          slug
        }
        slug
      }

      facialAestheticHeroes {
        intro
        heroImage {
          id
          url
        }
        datePosted
        title
        category {
          categoryTitle
          slug
        }
        slug
      }

      sexualEnhancementHeroes {
        intro
        heroImage {
          id
          url
        }
        datePosted
        title
        category {
          categoryTitle
          slug
        }
        slug
      }
    }
    allContentfulBlogCategory {
      edges {
        node {
          slug
          categoryTitle
          blogPosts {
            title
            slug
          }
        }
      }
    }
  }
`;
