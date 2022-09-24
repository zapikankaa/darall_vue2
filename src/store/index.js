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
    }
  },
  actions: {
    getPositions(context) {
      return HTTP.get('positions')
        .then(response => {
          context.commit({
            type: 'setPositions',
            positions: response.data
          })
        }) 
    },
    getPositionById(context, id) {
      return HTTP.get('positions/' + id)
        .then(response => { 
          context.commit({
            type: 'setCurrentPosition',
            currentPosition: response.data
          })
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
          context.commit('deletePosition', { id: response.data.id })
          return response
        })
    },
    getCategories(context) {
      return HTTP.get('categories')
        .then(response => {
          context.commit({
            type: 'setCategories',
            categories: response.data
          })
        }) 
    },
    postNewCategory(context, formData) {
      return HTTP.post('category/new', formData)
    },
    putCategory(context, formData) {
      return HTTP.put('category/' + formData.id, formData)
    },
    deleteCategory(context, id) {
      return HTTP.delete('category/' + id)
    }
  }
})
