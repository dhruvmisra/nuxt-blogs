import axios from 'axios';

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
    return new Promise((resolve, reject) => {
      axios.get('https://nuxt-blogs-18fe0.firebaseio.com/posts.json')
        .then(res => {
          for(let key in res.data) {
            let posts = [];
            for(let key in res.data) {
              posts.push({ ...res.data[key], id: key });
            }
            vuexContext.commit('set_loaded_posts', posts);
            resolve();
          }
        });

    })
  },
  setLoadedPosts({ commit }, posts) {
    commit('set_loaded_posts', posts);
  },
  addPost({commit}, newPost) {
    return axios.post('https://nuxt-blogs-18fe0.firebaseio.com/posts.json', newPost)
      .then(res => {
        commit('add_post', { ...newPost, id: res.data.name });
      })
      .catch(e => console.log(e));
  },
  editPost({commit}, editedPost) {
    return axios.put('https://nuxt-blogs-18fe0.firebaseio.com/posts/' + editedPost.id + '.json', editedPost)
      .then(res => {
        commit('edit_post', editedPost);
      })
      .catch(e => console.log(e));
  },
}