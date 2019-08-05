import Cookie from 'js-cookie';

export const state = () => ({
  loadedPosts: [],
  token: null
})

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },
  token(state) {
    return state.token;
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
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
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
  setLoadedPosts(vuexContext, posts) {
    vuexContext.commit('set_loaded_posts', posts);
  },
  addPost(vuexContext, newPost) {
    return this.$axios.$post('/posts.json?auth=' + vuexContext.getters.token, newPost)
      .then(data => {
        vuexContext.commit('add_post', { ...newPost, id: data.name });
      })
      .catch(e => console.log(e));
  },
  editPost(vuexContext, editedPost) {
    return this.$axios.$put('/posts/' + editedPost.id + '.json?auth=' + vuexContext.getters.token, editedPost)
      .then(data => {
        vuexContext.commit('edit_post', editedPost);
      })
      .catch(e => console.log(e));
  },
  authenticateUser(vuexContext, authData) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.APIKey;
    if(!authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.APIKey;
    }
    return this.$axios.$post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        vuexContext.commit('setToken', res.idToken);
        localStorage.setItem('token', res.idToken);
        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn)*1000);
        Cookie.set('token', res.idToken);
        Cookie.set('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn)*1000);
      })
      .catch(e => {
        console.log(e);
      });
  },
  initAuth(vuexContext, req) {
    let token, tokenExpiration;

    if(req) {
      if(!req.headers.cookie) {
        return;
      }

      const jwt = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
      if(!jwt) {
        return;
      }
      token = jwt.split('=')[1];
      const expiration = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiration='));
      if(!expiration) {
        return;
      }
      tokenExpiration = expiration.split('=')[1];
    } else {
      token = localStorage.getItem('token');
      tokenExpiration = localStorage.getItem('tokenExpiration');
    }

    if(!token || +tokenExpiration <= new Date().getTime()) {
      console.log('No token found/ invalid token');
      vuexContext.commit('clearToken');
      return;
    }
    vuexContext.commit('setToken', token);
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken');
    Cookie.remove('token');
    Cookie.remove('tokenExpiration');
    if(process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }
}