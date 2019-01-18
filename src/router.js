import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component:Home
    // },
    {
      path: '/',
      name: 'dati',
      component: () => import(/* webpackChunkName: "about" */ './views/Dati/Home/home.vue'),
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
      path: '/dati/item',
      name: 'itemlist',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Item/itemlist.vue"),
      // beforeEnter: (to, from, next) => { //在进入这个路由之前 先去授权页
      // }
    },{
      path: '/dati/auth',
      name: 'oauth',
      component: () => import(/* webpackChunkName: "about" */ './views/Dati/Item/oauth.vue')
    }, {
      path: '/dati/score',
      name:'score',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Score/score.vue")
    },{
      path: '/dati/empty',
      name:'empty',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Home/empty.vue")
    },{
      path: '/dati/share',
      name:'share',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Home/share.vue")
    },,{
      path: '/shareurl', //分享链接的
      name:'shareurl',
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dati/Home/shareurl.vue")
    }]
})
