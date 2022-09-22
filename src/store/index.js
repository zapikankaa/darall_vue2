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
      const position = state.positions.find(item => {
        return item.id === payload.id
      })
      if (position) {
        position.name = payload.name
        position.description = payload.description
        position.ingredients = payload.ingredients
        position.weight_g = payload.weight_g
        position.volume_ml = payload.volume_ml
        position.price_rub = payload.price_rub
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
    },
    putPosition(constext, formData) {
      return HTTP.put('positions/' + formData.id, formData)
    },
    deletePosition(context, id) {
      return HTTP.delete('positions/' + id)
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
