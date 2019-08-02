export const state = () => {
  loadedPosts: []
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
}

export const mutations = {
  set_loaded_posts(state, posts) {
    state.loadedPosts = posts;
  },
  add_post(state, newPost) {
    state.loadedPosts.push(newPost);
  },
  edit_post(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(post => {
      return post.id == editedPost.id;
    });

    state.loadedPosts[postIndex] = editedPost;
  }
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios.$get('/posts.json')
        .then(data => {
          for(let key in data) {
            let posts = [];
            for(let key in data) {
              posts.push({ ...data[key], id: key });
            }
            vuexContext.commit('set_loaded_posts', posts);
          }
        });
  },
  setLoadedPosts({ commit }, posts) {
    commit('set_loaded_posts', posts);
  },
  addPost({commit}, newPost) {
    return this.$axios.$post('/posts.json', newPost)
      .then(data => {
        commit('add_post', { ...newPost, id: data.name });
      })
      .catch(e => console.log(e));
  },
  editPost({commit}, editedPost) {
    return this.$axios.$put('/posts/' + editedPost.id + '.json', editedPost)
      .then(data => {
        commit('edit_post', editedPost);
      })
      .catch(e => console.log(e));
  },
}