const fs = require('fs');
const path = require('path');
const slash = require('slash');

// Include theme files in babel transpilation.
exports.onCreateWebpackConfig = ({loaders, actions}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-theme-minimal')),
          use: [loaders.js()]
        }
      ]
    }
  });
};

// Fetch page/post data from WordPress and generate appropriate pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
      {
          allWordpressPost {
              edges {
                  node {
                      id
                      slug
                      status
                      template
                      format
                  }
              }
          }
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
      }
  `);

  if (result.errors) {
      throw new Error(result.errors);
  }

  const { allWordpressPost, allWordpressPage } = result.data;

  const postTemplate = require.resolve('./src/templates/post.js');
  const pageTemplate = require.resolve('./src/templates/page.js')

  // Generate pages.
  allWordpressPage.edges.forEach((edge) => {
    return createPage({
      path: edge.node.slug,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id
      }
    })
  })

  // Generate posts.
  allWordpressPost.edges.forEach((edge) => {
    return createPage({
        path: edge.node.slug,
        component: slash(postTemplate),
        context: {
            id: edge.node.id,
        },
    });
  });
};
