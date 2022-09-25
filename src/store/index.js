import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const HTTP = axios.create({
  baseURL: 'http://localhost:3000/',
})

export default new Vuex.Store({
  state: {
    positions: [],
    categories: [],
    currentPosition: null
  },
  mutations: {
    setPositions(state, payload) {
      state.positions = payload.positions
    },
    setCurrentPosition(state, payload) {
      state.currentPosition = payload.currentPosition
    },
    pushToPositions(state, payload) {
      state.positions.push(payload.position)
    },
    updatePosition(state, payload) {
      state.currentPosition = payload
      if (state.positions.length > 0) {
        const posIndex = state.positions.findIndex(pos => pos.id === payload.id)
        state.positions[posIndex] = payload
      }
    },
    deletePosition(state, payload) {
      state.currentPosition = null
      if (state.positions.length > 0) {
        const posIndex = state.positions.findIndex(pos => pos.id === payload.id)
        state.positions.splice(posIndex, 1)
      }
    },
    setCategories(state, payload) {
      state.categories = payload.categories
    },
    pushToCategories(state, payload) {
      state.categories.push(payload.category)
    },
    updateCategory(state, payload) {
      const catIndex = state.categories.findIndex(cat => cat.id === payload.category.id)
      state.categories[catIndex] = payload.category
    },
    deleteCategory(state, payload) {
      const catIndex = state.categories.findIndex(cat => cat.id === payload.id)
      state.categories.splice(catIndex, 1)
    }
  },
  actions: {
    getPositions(context) {
      return HTTP.get('positions')
        .then(response => {
          if (response.status === 200) {
            context.commit({
              type: 'setPositions',
              positions: response.data
            })
          }
          return response
        }) 
    },
    getPositionById(context, id) {
      return HTTP.get('positions/' + id)
        .then(response => {
          if (response.status === 200) {
            context.commit({
              type: 'setCurrentPosition',
              currentPosition: response.data
            })
          }
          return response
        })
    },
    postNewPosition(context, formData) {
      return HTTP.post('position/new', formData)
        .then(response => {
          if (response.status === 200 && context.state.positions.length > 0) {
            context.commit({
              type: 'pushToPositions',
              position: response.data
            })
          }
          return response
        })
    },
    putPosition(context, formData) {
      return HTTP.put('positions/' + formData.id, formData)
        .then(response => {
          if (response.status === 200) {
            context.commit('updatePosition', response.data)
          }
          return response
        })
    },
    deletePosition(context, id) {
      return HTTP.delete('positions/' + id)
        .then(response => {
          if (response.status === 200) {
            context.commit('deletePosition', { id: response.data.id })
          }
          return response
        })
    },
    getCategories(context) {
      return HTTP.get('categories')
        .then(response => {
          if (response.status === 200) {
            context.commit({
              type: 'setCategories',
              categories: response.data
            })
          }
          return response
        }) 
    },
    postNewCategory(context, formData) {
      return HTTP.post('category/new', formData)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            context.commit({
              type: 'pushToCategories',
              category: response.data
            })
          }
          return response
        })
    },
    putCategory(context, formData) {
      return HTTP.put('category/' + formData.id, formData)
        .then(response => {
          if (response.status === 200) {
            context.commit({
              type: 'updateCategory',
              category: response.data
            })
          }
          return response
        })
    },
    deleteCategory(context, id) {
      return HTTP.delete('category/' + id)
        .then(response => {
          if (response.status === 200) {
            context.commit({
              type: 'deleteCategory',
              id: id
            })
          }
        })
    }
  }
})
