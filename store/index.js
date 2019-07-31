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
  nuxtServerInit(vuexContext, context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        vuexContext.commit('set_loaded_posts', [
            {
              id: "1",
              title: "First post",
              previewText: "This is our first post!",
              thumbnail:
                "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            },
            {
              id: "2",
              title: "Second post",
              previewText: "This is our second post!",
              thumbnail:
                "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            },
            {
              id: "3",
              title: "Third post",
              previewText: "This is our third post!",
              thumbnail:
                "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
          ]);
        resolve();
      }, 2000);
    })
  },
  setLoadedPosts({ commit }, posts) {
    commit('set_loaded_posts', posts);
  }
}