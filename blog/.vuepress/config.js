const config = require('../config.json');
console.log(process.env.appId)
module.exports = {
  title: config.title,
  description: config.description,
  base: "/",
  themeConfig: {
    logo: config.logo,
    nav: config.navigation,
  },
  head: [
    ['link', { rel: "icon", href: config.favicon }]
  ],
  markdown: {
    anchor: {
      permalink: false
    }
  },
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        container: '.comment-box',
        options: {
          lang: 'en',
          el: '#valine-vuepress-comment',
          appId: process.env.appId,
          appKey: process.env.appKey,
          path: '<%- frontmatter.date + frontmatter.title %>'
        }
      }
    ]
  ]
};
