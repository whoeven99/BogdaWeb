/* eslint-disable semi */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
const path = require(`path`);
const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const ghostConfig = {
  development: {
    apiUrl: process.env.GHOST_API_URL,
    contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    version: `v4`, // 明确指定 v4
  },
  production: {
    apiUrl: process.env.GHOST_API_URL,
    contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    version: `v4`,
  },
};

const { apiUrl, contentApiKey } =
  process.env.NODE_ENV === `development`
    ? ghostConfig.development
    : ghostConfig.production;

if (!apiUrl || !contentApiKey) {
  throw new Error(
    `GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build.`
  );
}

if (
  process.env.NODE_ENV === `production` &&
  config.siteUrl === `http://localhost:8000` &&
  !process.env.SITEURL
) {
  throw new Error(
    `siteUrl can't be localhost and needs to be configured in siteConfig or SITEURL env.`
  );
}

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITEURL || config.siteUrl,
  },
  pathPrefix: `/blog`,
  trailingSlash: 'always',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `pages`),
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `images`),
        name: `images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl,
        contentApiKey,
        version: `v4`, // 明确指定 v4
      },
    },
    {
      resolve: `gatsby-plugin-ghost-manifest`,
      options: {
        short_name: config.shortTitle,
        start_url: `/blog`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `static/${config.siteIcon}`,
        legacy: true,
        query: `
          {
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }
        `,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }
        `,
        feeds: [generateRSSFeed(config)],
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
          {
            allGhostPost {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostPage {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostTag {
              edges {
                node {
                  id
                  slug
                  feature_image
                }
              }
            }
            allGhostAuthor {
              edges {
                node {
                  id
                  slug
                  profile_image
                }
              }
            }
          }`,
        mapping: {
          allGhostPost: { sitemap: `posts` },
          allGhostTag: { sitemap: `tags` },
          allGhostAuthor: { sitemap: `authors` },
          allGhostPage: { sitemap: `pages` },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ],
};