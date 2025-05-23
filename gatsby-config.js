require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: `Lushful Aesthetics`,
    siteUrl: `https://www.lushfulaesthetics.com/`,
    description: `Lushful Aesthetics by Injector Chris`,
  },
  // TODO: creates re-hydration error
  // flags: {
  //   DEV_SSR: true,
  // },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-lodash`,
    // "gatsby-plugin-advanced-sitemap",

    {
      resolve: `gatsby-plugin-advanced-sitemap-webrication`,
      options: {
        createLinkInHead: true,
        addUncaughtPages: true,
        output: "/sitemap.xml",
        query: `
          {
            allContentfulServicePage {
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
      
            # allContentfulFooterContent {
            #   edges {
            #     node {
            #       privacyPolicySlug
            #     }
            #   }
            # }

            # allContentfulFooterContent {
            #   edges {
            #     node {
            #       hipaaSlug
            #     }
            #   }
            # }

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
        `,
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/sexual-enhancement-services/girthfillosophy`,
          `/sexual-enhancement-services/girthfillo`,
          `/sexual-enhancement-services/girthfillxl`,
          `/offline-plugin-app-shell-fallback`,
          `/my-excluded-page`,
          /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.lushfulaesthetics.com/",
        sitemap: "https://www.lushfulaesthetics.com/sitemap.xml/",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Playfair+Display:ital,wght@700;800`,
          `Roboto:ital,wght@300;400;500;700;900`,
        ],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        display: `minimal-ui`,
        start_url: `/`,
        name: `Lushful Aesthetics`,
        short_name: `LushfulAesthetics`,
        background_color: `#ffffff`,
        icon: `src/images/lushful_aesthetic_icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: `G-D8QZW3KJBK`,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "https://www.lushfulaesthetics.com",
        // defaults to false
        enableWebVitalsTracking: false,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PSX5GNZ",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
        // Defaults to false
        enableWebVitalsTracking: false,
        // Defaults to https://www.googletagmanager.com
        // selfHostedOrigin: "YOUR_SELF_HOSTED_ORIGIN",
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "438425791770503",
      },
    },
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
      //https://www.gatsbyjs.com/plugins/gatsby-plugin-html-attributes/
    },
  ],
};
