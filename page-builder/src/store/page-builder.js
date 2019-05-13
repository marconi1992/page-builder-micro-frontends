import { Vue } from 'hypernova-vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const novaCluster = process.env.NOVA_CLUSTER || 'http://localhost:3000'

export default () => new Vuex.Store({
  state: () => ({
    components: {},
    results: {},
    isLoadingPage: true,
    objectID: null
  }),
  actions: {
    async updateComponentData ({ commit, dispatch }, payload) {
      const { key } = payload
      commit('setComponentData', payload)
      return dispatch('renderView', key)
    },

    async renderViews ({ commit, state }) {
      const batch = state.components.reduce((acc, job, key) => {
        acc[key] = job
        return acc
      }, {})
      const results = await axios.post(`${novaCluster}/batch`, batch)
        .then(res => {
          const { data: { results } } = res

          return Object.keys(results).reduce((acc, key) => {
            acc[key] = {
              ...results[key],
              ...state.components[key],
              isRendering: false
            }
            return acc
          }, {})
        })
        .catch(error => {
          console.log(error)
        })

      commit('setResults', results)
      commit('setIsLoadingPage', false)
    },

    async renderView ({ commit, state }, key) {
      const component = state.components[key]

      commit('setOnRendering', key)
      const result = await axios.post(`${novaCluster}/batch`, {
        [key]: component
      })
        .then(res => {
          const { data: { results } } = res
          const result = results[key]

          return {
            ...result,
            ...component,
            isRendering: false
          }
        })
        .catch(error => {
          console.log(error)
        })

      commit('setResult', { result, key })
    },

    async updatePage ({ state }) {
      const { objectID, components } = state

      return axios.put(`/api/pages/${objectID}`, {
        components
      })
    }
  },
  mutations: {
    setResults (state, results) {
      state.results = results
    },
    setResult (state, { key, result }) {
      state.results[key] = result
    },
    setObjectID (state, objectID) {
      state.objectID = objectID
    },
    setComponents (state, components) {
      state.components = components
    },
    setComponentData (state, { key, data }) {
      state.components[key].data = data
    },
    setIsLoadingPage (state, isLoadingPage) {
      state.isLoadingPage = isLoadingPage
    },
    setOnRendering (state, key) {
      state.results[key].isRendering = true
    }
  },
  getters: {
    views: state => state.results,
    isLoadingPage: state => state.isLoadingPage,
    onRendering: state => state.onRendering
  }
})
