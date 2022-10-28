// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'

import App from './App'

import Delete from './components/article/Delete'

// import Editor from './components/v-md-editor/Editor'
// mavonEditor的引入
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Editor from './components/mavonEditor/Editor'
import markdownItMermaid from '@liradb2000/markdown-it-mermaid'

Vue.use(MavonEditor)

// MavonEditor.mavonEditor.getMarkdownIt().use(markdownItMermaid)  // v2.10.4 调用markdownIt的方式
MavonEditor.markdownIt.use(markdownItMermaid)

// v-md-editor的引入
// import VueMarkdownEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css'
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
//
// import Prism from 'prismjs'

// VueMarkdownEditor.use(vuepressTheme, {
//   Prism
// })
//
// Vue.use(VueMarkdownEditor)

Vue.use(ElementUI)

Vue.use(Vuex)

Vue.config.silent = true

Vue.component('back', {
  template: '<template>\n' +
    '  <el-button style="margin-bottom: 10px" @click="back">后退</el-button>\n' +
    '</template>',
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
})

Vue.component('editor', Editor)
Vue.component('delete', Delete)

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

Vue.prototype.uploadPictureCode = 0
Vue.prototype.uploadVideoCode = 1
Vue.prototype.uploadFileCode = 2

Vue.prototype.editTypeCreate = 0
Vue.prototype.editTypeEdit = 1

Vue.prototype.xssOptions = {
  whiteList: {
    iframe: ['src', 'height', 'width'],
    video: ['height', 'width', 'controls'],
    source: ['src', 'type'],
    div: ['style', 'height', 'width', 'align']
  }
}

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})

export default vm

// axios.interceptors.response.use(
//   response => {
//     console.log('aaa' + response)
//   }
// )
