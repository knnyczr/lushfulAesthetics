import React from "react";
import { graphql, Link } from "gatsby";

import SearchBar from "../components/SearchBar";
import FeaturedPost from "../components/FeaturedPost";
import BlogCardDesktop from "../components/BlogCardDektop";
import BlogCardMobile from "../components/BlogCardMobile";
import { faC, faIceCream } from "@fortawesome/free-solid-svg-icons";

export default function Blog({ data }) {
  console.log("here is data: ", data);

  const {
    contentfulBlogHomepage: {
      featuredPost,
      facialAestheticHeroes,
      bodyAestheticHeroes,
      sexualEnhancementHeroes,
    },
  } = data;

  console.log(
    "🧱 Blog Homepage data ",
    featuredPost,
    facialAestheticHeroes,
    bodyAestheticHeroes,
    sexualEnhancementHeroes
  );

  return (
    <>
      <FeaturedPost featuredPost={featuredPost} />
      <SearchBar />
      <BlogCardDesktop
        facialAesthetic={facialAestheticHeroes}
        bodyAesthetic={bodyAestheticHeroes}
        sexualEnhancement={sexualEnhancementHeroes}
      />
      <BlogCardMobile
        facialAesthetic={facialAestheticHeroes}
        bodyAesthetic={bodyAestheticHeroes}
        sexualEnhancement={sexualEnhancementHeroes}
      />
      {data.allContentfulBlogCategory.edges.map((category) => {
        return (
          <div key={category}>
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
          </div>
        );
      })}
    </>
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
