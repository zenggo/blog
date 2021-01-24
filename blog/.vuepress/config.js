const config = require('../config.json');
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
  // plugins: [
  //   [
  //     'vuepress-plugin-comment',
  //     {
  //       choosen: 'valine', 
  //       container: '.comment-box',
  //       options: {
  //         el: '#valine-vuepress-comment',
  //         appId: 'J4Jz3WQxk7neVvab53kjgayb-gzGzoHsz',
  //         appKey: '3PJM8Im3uqq6xQrQc93up9mH',
  //         path: '<%- frontmatter.commentid || frontmatter.permalink %>'
  //       }
  //     }
  //   ]
  // ]
};
