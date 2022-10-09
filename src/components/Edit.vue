<template>
  <div id="app">
    <div id="editor-main">
      <le-editor v-model="content" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Edit',
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
  methods: {
    save: function (val) {
      // 获取预览文本
      console.log(this.content) // 这里是原markdown文本
      console.log(val) // 这个是解析出的html
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJDcmVhdGVkVGltZSI6MTY2NTMwNDMzNjQxOSwic2Vzc2lvbklkIjoiMTU5MDAzOTMyMzZfZjk1N2ZhN2VhNDNlNDExNzhiNzM3OGE4ZDk5MTkxOWUiLCJleHAiOjE2NjUzMDYxMzZ9.bkRVotaDuVIZE5tupo7sJbMOQO_9QVEjhFHTz4B6yuLOOydw95m7uRfPD968djRsLKfWf5cg-YQ3jNJk6wVRaw'
        }
      }
      axios
        .post('http://localhost:8186/article/addOrUpdate', {
          'id': '1579006856955691008',
          'parentId': 0,
          'title': '111111',
          'content': this.content,
          'type': 0
        }, config)
        .then(response => (this.info = response))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
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
