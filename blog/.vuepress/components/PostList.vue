<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.title" class="post">
      <router-link tag="h2" :to="post.path" class="title">{{ post.frontmatter.title }}</router-link>
      <p class="date">{{ new Date(post.frontmatter.date).toDateString() }}</p>
      <p v-if="post.frontmatter.description">{{ post.frontmatter.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      posts() {
        return this.$site.pages
          .filter(x => x.path.startsWith('/post/') && !x.frontmatter.post_index)
          .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      }
    }
  }
</script>

<style scoped>
  .title {
    cursor: pointer;
  }
  .date {
    font-size: 0.8rem;
  }
  .post {
    padding: 2rem 0;
    border-bottom: 1px solid #eee;
  }
  .post:last-of-type {
    border: 0;
  }
  .post h2 {
    margin: 0 0 1rem 0;
  }
  .post h2:hover {
    opacity: 0.6;
  }
  .post p {
    margin: 0;
    color: #333;
  }
</style>
