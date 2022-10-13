import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Edit from '@/components/mavonEditor/article/edit/Edit'
import Detail from '@/components/mavonEditor/article/detail/Detail'
import Login from '@/components/mavonEditor/user/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
