<template>
  <div id="app">
    <div>
      <el-input placeholder="请输入标题" v-model="title"></el-input>
    </div>
    <mavon-editor class="lang-vue" v-model="content" :ishljs="true" :codeStyle="codeStyle" @save="save"
                  @navigationToggle="addUrl"/>
  </div>
</template>

<script>

export default {
  name: 'Edit',
  data: function () {
    return {
      title: '未命名标题',
      content: '',
      codeStyle: 'agate',
      id: ''
    }
  },
  methods: {
    save: function (val) {
      // 获取预览文本
      // console.log(this.content) // 这里是原markdown文本
      // console.log(val) // 这个是解析出的html
      this.axios
        .post('/article/addOrUpdate', {
          'id': this.id,
          'parentId': 0,
          'title': this.title,
          'content': this.content,
          'type': 0
        })
        .then(response => {
          this.info = response
          let success = response.data.success
          this.id = response.data.data.id
          this.title = response.data.data.title
          if (success) {
            alert('\'保存成功\'')
          } else {
            alert('\'保存失败, 原因为; \'' + response.data.errorMessage)
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    addUrl() {
      this.$nextTick(function () {
        let _aList = document.querySelectorAll('.v-note-navigation-content a')
        for (let i = 0; i < _aList.length; i++) {
          let _aParent = _aList[i].parentNode
          let _a = _aParent.firstChild
          if (!_a.id) continue // 把不属于导航中的a标签去掉，否则会报错
          let _text = _aParent.lastChild
          let text = _text.textContent
          _a.href = '#' + _a.id
          _a.innerText = text
          _aParent.removeChild(_text)
          // _a.style.color = "red";
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.axios
        .get('/article/detail', {
          params: {
            'id': '1581840943009497088'
          }
        })
        .then(response => {
          this.content = response.data.data.content
          this.title = response.data.data.title
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#app {
  width: 95%;
  height: 580px;
  margin: auto;
}

#app .lang-vue {
  font-size: 20px;
}

#title {
  font-size: 60px;
  height: 10%;
}

</style>
