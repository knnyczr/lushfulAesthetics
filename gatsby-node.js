const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const servicePageTemplate = path.resolve(`./src/templates/servicePage.js`);
  // const packagesPageTemplate = path.resolve(`./src/templates/packagesPage.js`);
  const generalFAQsTemplate = path.resolve(`./src/templates/generalFAQs.js`);
  const privacyPolicyTemplate = path.resolve(
    `./src/templates/privacyPolicyPage.js`
  );
  const hipaaPolicyTemplate = path.resolve(
    `./src/templates/hipaaPolicyPage.js`
  );
  const categoryPageTemplate = path.resolve(`./src/templates/blogCategory.js`);
  const blogPageTemplate = path.resolve(`./src/templates/blogPost.js`);

  const {
    data: {
      allContentfulServicePage,
      // allContentfulPackagePage,
      allContentfulGeneralFaqPage,
      allContentfulPrivacyPolicyPage,
      allContentfulHipaaPolicyPage,
      allContentfulBlogCategory,
      allContentfulBlogPost,
    },
  } = await graphql(`
    {
      allContentfulServicePage {
        edges {
          node {
            slug
            id
          }
        }
      }

      # allContentfulPackagePage {
      #   edges {
      #     node {
      #       slug
      #       id
      #     }
      #   }
      # }

      allContentfulGeneralFaqPage(limit: 1) {
        edges {
          node {
            slug
            id
          }
        }
      }

      allContentfulPrivacyPolicyPage(limit: 1) {
        edges {
          node {
            slug
            id
          }
        }
      }

      allContentfulHipaaPolicyPage(limit: 1) {
        edges {
          node {
            slug
            id
          }
        }
      }
      allContentfulBlogCategory {
        edges {
          node {
            slug
            id
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            slug
            category {
              slug
            }
          }
        }
      }
    }
  `);
  allContentfulServicePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: servicePageTemplate,
      context: {
        servicePageId: page.node.id,
      },
    });
  });

  // allContentfulPackagePage.edges.forEach((page) => {
  //   createPage({
  //     path: `/${page.node.slug}/`,
  //     component: packagesPageTemplate,
  //     context: {
  //       packagePageId: page.node.id,
  //     },
  //   });
  // });

  allContentfulGeneralFaqPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: generalFAQsTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulPrivacyPolicyPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: privacyPolicyTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulHipaaPolicyPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: hipaaPolicyTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulBlogCategory.edges.forEach((page) => {
    createPage({
      path: `/blog/${page.node.slug}/`,
      context: { blogCategory: page.node.id },
      component: categoryPageTemplate,
    });
  });

  allContentfulBlogPost.edges.forEach((page) => {
    createPage({
      path: `/blog/${page.node.category.slug}/${page.node.slug}/`,
      context: { pageId: page.node.slug },
      component: blogPageTemplate,
    });
  });

  createRedirect({
    fromPath: `/facial-aesthetic-services/botox/`,
    toPath: `/facial-injectable-services/botox/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/cheek-filler/`,
    toPath: `/facial-injectable-services/cheek-filler/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/lip-filler/`,
    toPath: `/facial-injectable-services/lip-filler/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/jawline-filler/`,
    toPath: `/facial-injectable-services/jawline-filler/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/chin-filler/`,
    toPath: `/facial-injectable-services/chin-filler/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/nasolabiel-fold-filler/`,
    toPath: `/facial-injectable-services/nasolabial-fold-filler/`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/prp/under-eye-prp/`,
    toPath: `/facial-injectable-services/prp/under-eye-prp/`,
  });
};
