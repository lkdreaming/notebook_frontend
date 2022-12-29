import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Create from '@/components/article/create/Create'
import Edit from '@/components/article/edit/Edit'
import Detail from '@/components/article/detail/Detail'
import Login from '@/components/user/login/Login'
import TestMenu from '@/components/test/TestMenu'
// import List from '@/components/mavonEditor/article/list/List'

Vue.use(Router)

// 当前页转同样路由时会报错.
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      redirect: '/login'
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
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
    },
    {
      path: '/testMenu',
      name: 'TestMenu',
      component: TestMenu
    }
  ]
})
