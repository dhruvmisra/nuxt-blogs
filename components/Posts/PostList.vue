<template>
  <section class="post-list">
    <PostPreview
      id="1"
      title="This is the first"
      thumbnail="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      previewText="This is a sample preview text"
    />
    <PostPreview
      id="2"
      title="Hello there!"
      thumbnail="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      previewText="This is a sample preview text 2"
    />
    <PostPreview
      id="3"
      title="Woohooo!"
      thumbnail="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      previewText="This is a sample preview text 3"
    />
  </section>
</template>

<script>
  import PostPreview from "@/components/Posts/PostPreview";

  export default {
    components: {
      PostPreview
    }
  };
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

