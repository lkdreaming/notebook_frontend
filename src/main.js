// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'

import App from './App'

import VueTreeList from 'vue-tree-list'
// import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(mavonEditor)

Vue.use(ElementUI)

Vue.use(Vuex)

Vue.use(VueTreeList)

// 不同环境用不同的域名
// process.env.BASE_API是config/*.env.js中的BASE_API
axios.defaults.baseURL = process.env.BASE_API

// 配置全局请求的header
axios.defaults.headers.common['Content-Type'] = 'application/json'
let jwtToken = localStorage.getItem('token')
if (jwtToken) {
  axios.defaults.headers.common['Authorization'] = jwtToken
}

Vue.config.productionTip = false

const isTokenExpired = () => { // 验证当前token是否过期
// eslint-disable-next-line no-undef,no-unused-expressions
  if (jwtToken) {
    let expireTime = Number(localStorage.getItem('tokenExpireTimeStamp'))
    let nowTime = new Date().getTime()
    // 如果超过60秒重新获取token
    return (expireTime - nowTime) < 60
  }
  return false
}

// 是否正在刷新的标记 -- 防止重复发出刷新token接口--节流阀
let isRefreshing = false

axios.interceptors.request.use(
  config => {
    console.log('jwtToken: ' + jwtToken)
    if (isTokenExpired()) { // 如果过期了, 则需要用RefreshedToken换新的token
      if (!isRefreshing) {
        isRefreshing = true
        let refreshToken = localStorage.getItem('RefreshedToken')
        axios
          .post('/user/getNewToken',
            {
              'RefreshedToken': refreshToken
            })
          .then(response => {
            isRefreshing = false
            let success = response.data.success
            if (success) {
              localStorage.setItem('token', response.data.data.Authorization)
              localStorage.setItem('tokenExpireTimeStamp', response.data.data.tokenExpireTimeStamp)
              localStorage.setItem('RefreshedToken', response.data.data.RefreshedToken)
            } else {
              alert(response.data.errorMessage)
              this.$router.push('/login')
            }
          }).catch(() => {
            isRefreshing = false
            this.$router.push('/login')
          })
      }
    }
    return config
  })

// 挂载到vue原型链上
Vue.prototype.axios = axios

Vue.prototype.tokenData = localStorage.getItem('tokenData')

Vue.prototype.figureBedUrl = process.env.FIGURE_BED_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})

// axios.interceptors.response.use(
//   response => {
//     console.log('aaa' + response)
//   }
// )
