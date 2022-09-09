const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const servicePageTemplate = path.resolve(`./src/templates/servicePage.js`);
  const packagesPageTemplate = path.resolve(`./src/templates/packagesPage.js`);
  const generalFAQsTemplate = path.resolve(`./src/templates/generalFAQs.js`);
  const privacyPolicyTemplate = path.resolve(
    `./src/templates/privacyPolicyPage.js`
  );
  const hipaaPolicyTemplate = path.resolve(
    `./src/templates/hipaaPolicyPage.js`
  );

  const {
    data: {
      allContentfulServicePage,
      allContentfulPackagePage,
      allContentfulGeneralFaqPage,
      allContentfulPrivacyPolicyPage,
      allContentfulHipaaPolicyPage,
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

      allContentfulPackagePage {
        edges {
          node {
            slug
            id
          }
        }
      }

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
    }
  `);
  // console.log(result);
  allContentfulServicePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: servicePageTemplate,
      context: {
        servicePageId: page.node.id,
      },
    });
  });

  allContentfulPackagePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: packagesPageTemplate,
      context: {
        packagePageId: page.node.id,
      },
    });
  });

  allContentfulGeneralFaqPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: generalFAQsTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulPrivacyPolicyPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: privacyPolicyTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulHipaaPolicyPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: hipaaPolicyTemplate,
      context: { pageId: page.node.id },
    });
  });
};
