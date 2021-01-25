const config = require('../config.json');

module.exports = {
  title: config.title,
  description: config.description,
  base: "/",
  themeConfig: {
    logo: config.logo,
    nav: config.navigation,
  },
  // head: [
  //   ['link', { rel: "icon", href: config.favicon }]
  // ],
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
        container: '#valine-wrapper',
        options: {
          lang: 'en',
          el: '#valine-vuepress-comment',
          appId: process.env.appId,
          appKey: process.env.appKey,
          path: '<%-window.location.pathname%>',
          visitor: !!process.env.visitor // 阅读量统计
        }
      }
    ]
  ]
};
