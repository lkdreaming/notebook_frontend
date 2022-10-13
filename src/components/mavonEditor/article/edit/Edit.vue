<template>
  <div id="app">
    <h1 id="title">{{ title }}</h1>
    <mavon-editor class="lang-vue" v-model="content" :ishljs="true" :codeStyle="codeStyle" @save="save" @navigationToggle="addUrl"/>
  </div>
</template>

<script>

export default {
  name: 'Edit',
  data: function () {
    return {
      title: '',
      content: '',
      codeStyle: 'agate'
    }
  },
  methods: {
    save: function (val) {
      // 获取预览文本
      // console.log(this.content) // 这里是原markdown文本
      // console.log(val) // 这个是解析出的html
      this.axios
        .post('/article/addOrUpdate', {
          'id': '1579006856955691008',
          'parentId': 0,
          'title': '111111',
          'content': this.content,
          'type': 0
        })
        .then(response => {
          this.info = response
          let success = response.data.success
          if (success) {
            alert("'保存成功'")
          } else {
            alert("'保存失败, 原因为; '" + response.data.errorMessage)
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
  mounted () {
    this.$nextTick(() => {
      this.axios
        .get('/article/detail', {
          params: {
            'id': '1579006856955691008'
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
<style lang="scss">
#app {
  width: 95%;
  height: 580px;
  margin: auto;
}

#app .lang-vue{
  font-size: 20px;
}

#title {
  font-size: 60px;
}

</style>
