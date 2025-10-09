import React from "react";
import { graphql } from "gatsby";

export default function S3SmokeTest({ data }) {
  const serviceCount = data.allContentfulServicePage.totalCount;
  const postCount = data.allContentfulBlogPost.totalCount;
  const assetCount = data.allContentfulAsset.totalCount;

  const firstPost = data.allContentfulBlogPost.nodes[0];
  const title = firstPost?.title || "(no post)";
  const raw = firstPost?.article?.raw;
  const rawLen = raw
    ? typeof raw === "string"
      ? raw.length
      : JSON.stringify(raw).length
    : 0;
  const refs = firstPost?.article?.references || [];

  return (
    <div style={{ padding: 24 }}>
      <h1>S3 Smoke Test</h1>
      <div>
        <div>Service pages: {serviceCount}</div>
        <div>Blog posts: {postCount}</div>
        <div>Assets: {assetCount}</div>
      </div>
      <hr />
      <div>
        <div>First BlogPost title: {title}</div>
        <div>article.raw length: {rawLen}</div>
        {refs.length > 0 && (
          <div>
            <h3>First reference</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(
                {
                  __typename: refs[0]?.__typename,
                  title: refs[0]?.title,
                  description: refs[0]?.description,
                  url: refs[0]?.url,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export const query = graphql`
  query S3SmokeTestQuery {
    allContentfulServicePage {
      totalCount
    }
    allContentfulBlogPost(limit: 1) {
      totalCount
      nodes {
        title
        article {
          raw
          references {
            __typename
            ... on ContentfulAsset {
              title
              description
              url
            }
          }
        }
      }
    }
    allContentfulAsset {
      totalCount
    }
  }
`;
