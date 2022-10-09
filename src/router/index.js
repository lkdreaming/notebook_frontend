import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Edit from '@/components/Edit'
import Detail from '@/components/Detail'

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
    }
  ]
})
