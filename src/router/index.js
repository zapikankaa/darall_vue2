import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuPositions from '../views/MenuPositions.vue'
import Position from '../views/Position.vue'
import NewPosition from '../views/NewPosition.vue'
import Categories from '../views/Categories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MenuPositions',
    component: MenuPositions
  },
  {
    path: '/position/new',
    name: 'NewPosition',
    component: NewPosition
  },
  {
    path: '/position/:id',
    name: 'Position',
    component: Position,
    props: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
