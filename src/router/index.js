import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import BootUsers from '../components/user/BootUsers.vue'
import Goods from '../components/goods/goods.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
},
  {
    path:'/login',
    component: Login
},
{
  path:'/home',
  component: Home,
  redirect:'/welcome',
  children:[
    { path:'/welcome',component:Welcome},
    { path:'/users',component:Users},
    { path:'/bootusers',component:BootUsers},
    { path:'/goods',component:Goods},
  ]

}
  
]

const router = new VueRouter({
  routes
})
// 挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问
  // from 来自路径
  // next 放行函数
  if(to.path === '/login') return next()
 const tokenStr = window.sessionStorage.getItem('token')
 if(!tokenStr) return next('/login')
 next()
})

export default router
