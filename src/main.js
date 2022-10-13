// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
// // 引入jQuery、bootstrap
import $ from 'jquery'
import 'bootstrap'
//
// // 引入bootstrap样式
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(mavonEditor)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

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
// alert(1111)
axios.interceptors.request.use(
  config => {
    // console.log(config)
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

// 全局注册 $
Vue.prototype.$ = $

// axios.interceptors.response.use(
//   response => {
//     console.log('aaa' + response)
//   }
// )
