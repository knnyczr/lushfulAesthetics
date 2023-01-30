import { graphql, Link } from "gatsby";
import React from "react";

import SearchBar from "../components/blog/SearchBar";
import FeaturedPost from "../components/blog/FeaturedPost";
import Categories from "../components/blog/Categories";

export default function Blog({ data }) {
  // console.log("here is data: ", data);

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
    <div>
      <FeaturedPost featuredPost={featuredPost} />
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-start-3 md:pr-24 py-4 px-4">
          <div className="h-0.5 bg-black mb-4" />
          <Categories categories={data.allContentfulBlogCategory.edges} />
        </div>

        <div className="lg:pl-24 md:row-start-1 md:pl-12 md:pr-24 md:col-span-2 px-4 py-4">
          {data.allContentfulBlogCategory.edges.map((category) => {
            return (
              <div key={category}>
                <div className="h-0.5 bg-black mb-4" />
                <Link
                  className="font-sans uppercase font-medium"
                  to={`${category.node.slug}`}
                >
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
        }
        title
        uniqueIdentifier
      }

      facialAestheticHeroes {
        intro
        heroImage {
          id
        }
        title
        uniqueIdentifier
      }

      sexualEnhancementHeroes {
        intro
        heroImage {
          id
        }
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
