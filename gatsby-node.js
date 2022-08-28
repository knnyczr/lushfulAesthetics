const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const servicePageTemplate = path.resolve(`./src/templates/servicePage.js`);
  const packagesPageTemplate = path.resolve(`./src/templates/packagesPage.js`);

  const result = await graphql(`
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
    }
  `);
  // console.log(result);
  result.data.allContentfulServicePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: servicePageTemplate,
      context: {
        servicePageId: page.node.id,
      },
    });
  });

  result.data.allContentfulPackagePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}`,
      component: packagesPageTemplate,
      context: {
        packagePageId: page.node.id,
      },
    });
  });
};
