module.exports = {
  siteMetadata: {
    title: `lushful-aesthetics`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "2_MBwg8MMyFytNnNcTtCfwFjpcVATtKUhZ40bWOJv7Y",
      "spaceId": "eh73f2j8s7u9"
    }
  }, "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};