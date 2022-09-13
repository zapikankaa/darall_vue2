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
    setCategories(state, payload) {
      state.categories = payload.categories
    }
  },
  actions: {
    getPositions(context) {
      HTTP.get('positions')
        .then(response => {
          context.commit({
            type: 'setPositions',
            positions: response.data
          })
        }) 
    },
    getPositionById(context, id) {
      HTTP.get('positions/' + id)
        .then(response => { 
          context.commit({
            type: 'setCurrentPosition',
            currentPosition: response.data
          })
         })
      
    },
    postNewPosition(context, formData) {
      return HTTP.post('position/new', formData)
    },
    getCategories(context) {
      HTTP.get('categories')
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
