const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const servicePageTemplate = path.resolve(`./src/templates/servicePage.js`);

  const result = await graphql(`
    {
      allContentfulServicePage {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  // console.log(result);
  result.data.allContentfulServicePage.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.slug}`,
      component: servicePageTemplate,
      context: {
        servicePageSlug: edge.node.slug,
      },
    });
  });
};
