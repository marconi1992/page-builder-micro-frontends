import { Vue } from 'hypernova-vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const getUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://0.0.0.0:3000/api/repos'
  }
  return '/api/repos'
}

export default () => new Vuex.Store({
  state: () => ({
    items: [],
    search: {
      term: '',
      page: 1,
      size: 8
    },
    isLoading: false
  }),
  actions: {
    async search ({ commit }, { term, page = 1, size = 8 }) {
      commit('setIsLoading', true)
      const repos = await axios.get(getUrl(), {
        params: {
          q: term,
          page,
          per_page: size
        }
      }).then(res => res.data)
      commit('setIsLoading', false)
      commit('pushItems', repos)
      commit('setMetaSearch', {
        term,
        page,
        size
      })
    },

    async loadMore ({ dispatch, state: { search } }) {
      dispatch('search', {
        ...search,
        page: search.page + 1
      })
    }
  },
  mutations: {
    pushItems (state, items) {
      state.items = state.items.concat(items)
    },
    setMetaSearch (state, search) {
      state.search = search
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  }
})
