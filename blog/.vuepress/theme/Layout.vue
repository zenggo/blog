<template>
  <div class="wrapper">

    <Navbar :logo="$site.themeConfig.logo" :sticky="$route.path === '/'" />

    <div class="container">

      <!-- home -->
      <div v-if="$route.path === '/'">
        <Content/>
      </div>

      <!-- post list -->
      <div v-if="$route.path === '/post/'" class="post-list">
        <Content />
      </div>

      <!-- Single post -->
      <div v-if="isSinglePost" class="single-post">
        <div class="post-date">{{ new Date($page.frontmatter.date).toDateString() }}</div>
        <h1 class="post-title">{{ $page.frontmatter.title }}</h1>
        <div class="post-desc" v-if="$page.frontmatter.description">{{ $page.frontmatter.description }}</div>
        <Content/>
      </div>

      <!-- comment and counter -->
      <div id="valine-wrapper" :style="`display: ${isSinglePost ? 'block': 'none'}`">
        <div :id="$route.path" class="leancloud_visitors" :data-flag-title="$page.frontmatter.title">
            <em class="post-meta-item-text">Read: </em>
            <i class="leancloud-visitors-count">1000000</i>
        </div>
      </div>

    </div>


    <Footer v-if="$route.path === '/'" />

  </div>
</template>

<script>
  export default {
    computed: {
      isSinglePost() {
        const postRoute = '/post/'
        const path = this.$route.path
        if (path.includes('post') && path.length >= (postRoute.length + 1)) {
          return true
        }
      }
    }
  }
</script>

<style>

  :root {
    --color-black: #1c1c1c;
    --color-highlight: rgba(249, 233, 172, 0.99);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::-moz-selection {
    background: var(--color-highlight);
    color: var(--color-black);
  }

  *::-webkit-selection {
    background: var(--color-highlight);
    color: var(--color-black);
  }

  *::selection {
    background: var(--color-highlight);
    color: var(--color-black);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    background: #fff;
    color: var(--color-black);
  }

  img {
    width: 100%;
    max-width: 100%;
    line-height: 0;
    margin: 2rem 0;
  }

  .container {
    padding: 0 5vw;
  /* }

  .post-list, .single-post { */
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }

  .single-post .post-date {
    font-size: 0.8rem;
    color: #555;
  }

  h1,h2,h3,h4,h5,h6,p {
    width: 100%;
    max-width: 800px;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.15;
    font-weight: 300;
    margin: 0 auto 3rem auto;
  }

  h2 {
    font-size: 2rem;
    font-weight: 300;
    margin: 2rem auto 2rem auto;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 2rem auto 1rem auto;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 1rem auto 2rem auto;
  }

  pre {
    background: var(--color-black);
    padding: 1rem;
    margin: 1rem 0;
  }

  code {
    color: white;
    background: var(--color-black);
    font-size: 0.8rem;
    padding: 0.05rem 0.25rem;
    font-weight: 400;
  }

  .comment-box {
    margin-top: 3rem;
  }

  .comment-box a {
    color: #000;
  }

  h1.post-title {
    margin-bottom: 1rem;
  }
  .post-desc {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 3rem;
    text-align: right;
  }

  .leancloud_visitors {
    color: #555;
    font-size: 0.9rem;
    padding: 1.5rem 0;
    text-align: right;
  }

</style>
