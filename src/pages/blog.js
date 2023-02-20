import React from "react";
import { graphql } from "gatsby";

import BlogCardDesktop from "../components/blog/blogCards/BlogCardDesktop";
import BlogCardMobile from "../components/blog/blogCards/BlogCardMobile";
import Categories from "../components/blog/Categories";
import FeaturedPost from "../components/blog/FeaturedPost";
import SearchBar from "../components/blog/SearchBar";

export default function Blog({ data }) {
  const {
    contentfulBlogHomepage: {
      featuredPost,
      facialAestheticHeroes,
      bodyAestheticHeroes,
      sexualEnhancementHeroes,
    },
  } = data;

  return (
    <div>
      <FeaturedPost featuredPost={featuredPost} />
      {/* <SearchBar /> */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-start-3 md:pr-24 py-4 px-4">
          <div className="h-0.5 bg-black mb-4" />
          <Categories categories={data.allContentfulBlogCategory.edges} />
        </div>

        <div className="lg:pl-24 md:row-start-1 md:pl-12 md:pr-12 lg:pr-24 md:col-span-2 px-4 py-4">
          <div className="hidden w-full h-auto md:flex md:flex-col">
            <BlogCardDesktop
              facialCategory={facialAestheticHeroes}
              bodyCategory={bodyAestheticHeroes}
              sexualCategory={sexualEnhancementHeroes}
            />
          </div>
          <div className="md:hidden flex flex-col h-auto">
            <BlogCardMobile
              facialCategory={facialAestheticHeroes}
              bodyCategory={bodyAestheticHeroes}
              sexualCategory={sexualEnhancementHeroes}
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
        uniqueIdentifier
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
        uniqueIdentifier
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
        uniqueIdentifier
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
        uniqueIdentifier
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
