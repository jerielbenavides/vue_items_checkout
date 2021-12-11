import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Items from '../views/Items.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'
import Logout from '../views/Logout.vue'
// import EditProfile from '../views/EditProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/loan',
    name: 'loan',
    component: Items,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    props: true
  },
  // {
  //   path: '/profile/edit',
  //   name: 'EditProfile',
  //   component: EditProfile
  // },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: true
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
