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
  console.log(result);
  result.data.allContentfulServicePage.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.slug}`,
      component: servicePageTemplate,
      context: {
        data: edge.node.slug,
      },
    });
  });

  //   return new Promise((resolve, reject) => {
  //     resolve(
  //       graphql(`
  // {
  //   allContentfulServicePage {
  //     edges {
  //       node {
  //         slug
  //       }
  //     }
  //   }
  // }
  //       `)
  //     ).then((result) => {
  //       if (result.errors) {
  //         console.log(result.errors);
  //         reject(result.errors);
  //       }
  //       console.log("HERE IS RESULT: ", result);

  //       result.data.allContentfulServicePage.edges.map((data) => {
  //         createPage({
  //           path: `/${data.node.slug}`,
  //           component: servicePageTemplate,
  //           context: {
  //             slug: data.node.slug,
  //           },
  //         });
  //       });
  //     });
  //   });
};
