import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/pages/content'
import Login from '@/pages/login'
import Params from '@/pages/params'
import Product from '@/pages/product'
import Layout from '@/pages/layout';
import store from '../store'



Vue.use(Router)

const routes =[
    
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      isLogin:false
    }
  },
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',redirect:('/product')
      },
      {
        path: 'content',
        name: 'Content',
        component: Content,
        meta:{
          isLogin:true
        }
      },{
        path: 'params',
        name: 'Params',
        component: Params,
        meta:{
          isLogin:true
        }
      },{
        path: 'product',
        name: 'Product',
        component: Product,
        meta:{
          isLogin:true
        }
      }
    ]
  }
]

const router = new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    if(store.state.LoginModule.token){
      next()
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next()
  }
})

export default router
