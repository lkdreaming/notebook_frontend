<template>
  <div id="app">
    <el-page-header @back="goBack" content="编辑" style="margin-bottom: 20px"></el-page-header>
    <div>
      <el-input placeholder="请输入标题" v-model="title" style="margin-bottom: 20px"></el-input>
    </div>
    <mavon-editor class="lang-vue" v-model="content" :ishljs="true" :codeStyle="codeStyle" @save="save"
                  @navigationToggle="addUrl" @imgAdd="imgAdd" ref="md"/>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data: function () {
    return {
      title: '',
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
          'parentId': this.$route.params.parentId ? this.$route.params.parentId : 0,
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
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('\'保存失败, 原因为; \'' + response.data.errorMessage)
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
    },
    async imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('image', $file)
      await this.axios.post('/file/upload',
        formdata).then(response => {
        this.$refs.md.$img2Url(pos, process.env.FIGURE_BED_URL + '/' + response.data.data.uri)
      }).catch(function (error) { // 请求失败处理
        console.log(error)
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getDetail()
    // })
  }
  // created() {
  //   this.getDetail()
  // }
  // computed() {
  //
  // }
  // created() {
  //   // alert('created')
  //   this.$nextTick(() => {
  //     this.axios
  //       .get('/article/detail', {
  //         params: {
  //           'id': this.$route.params.id === null ? localStorage.getItem('articleId') : this.$route.params.id
  //         }
  //       })
  //       .then(response => {
  //         this.content = response.data.data.content
  //         this.title = response.data.data.title
  //         this.id = this.$route.params.id === null ? localStorage.getItem('articleId') : this.$route.params.id
  //         alert(this.id)
  //       })
  //       .catch(function (error) { // 请求失败处理
  //         console.log(error)
  //       })
  //   })
  // }
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
