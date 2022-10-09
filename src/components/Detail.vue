<template>
  <div id="app">
    <div id="main">
      <h1>{{ title }}</h1>
      <le-context-menu></le-context-menu>
      <le-preview ref="md-preview" :is-md="true" :value="content" :hljs-css="hljsCss"></le-preview>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Detail',
  title: '',
  content: '',
  data () {
    return {
      hljsCss: 'agate',
      title: '',
      content: '',
      // 自定义
      imageUploader: {
        custom: false,
        fileType: 'file',
        fileNameType: '',
        imagePrefix: 'http://106.54.92.121', // 图片上传成功后，预览地址前缀
        type: 'server',
        url: 'http://106.54.92.121:82/upload' // 上传接口地址
      }
    }
  },
  mounted () {
    axios
      .get('http://localhost:8186/article/detail', {
        params: {
          'id': '1579006856955691008'
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJDcmVhdGVkVGltZSI6MTY2NTMwNjI0MTc5NCwic2Vzc2lvbklkIjoiMTU5MDAzOTMyMzZfYWZkY2FlZmE1YWE2NDk2MzhlMDMwZTVlY2Q5ZTdmZmQiLCJleHAiOjE2NjUzMDgwNDF9.Ca7XRlFIfXrqmGUc5No1DFqU3j6bNdyrD2XVS-MqVJQv4iyNy9cFrtT6TtLGEFY3jKLnZlBauvmw5uh7z8_onw'
        }
      })
      // .then(function (response) {
      //   this.content = response.data.data.content
      //   // this.title = response.data.data.title
      // })
      .then(response => {
        this.content = response.data.data.content
        this.title = response.data.data.title
      })
      .catch(function (error) { // 请求失败处理
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#app {
  width: 1200px;
  height: 500px;
  margin: 50px auto;
}

#editor-main {
  color: #2c3e50;
  width: 100%;
  height: 100%;
  text-align: left;
}

#main {
  color: #2c3e50;
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
