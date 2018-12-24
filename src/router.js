import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'recipes',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Recipes/recipes.vue')
    },
    {
      path: '/dati',
      name: 'dati',
      component: () => import(/* webpackChunkName: "about" */ './views/Dati/Home/home.vue')
    },
    {
      path: '/dati/item',
      name: 'itemlist',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Item/itemlist.vue")
    }, {
      path: '/dati/score',
      name:'score',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Score/score.vue")
    }]
})
