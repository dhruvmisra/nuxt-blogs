<template>
  <div class="admin-page">
    <div class="new-post">
      <button @click="$router.push('/admin/new-post')" class="btn btn-primary btn-lg rounded-0">Create Post</button>
    </div>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList';

  export default {
    layout: 'admin',
    components: {
      PostList
    },
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts;
      }
    },
  }
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  padding: 20px;
  text-align: center;
}
</style>


