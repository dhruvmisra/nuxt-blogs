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
  }
}

export const actions = {
  setLoadedPosts({commit}, posts) {
    commit('set_loaded_posts', posts);
  }
}