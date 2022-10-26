<template>
  <div id="app">
    <el-page-header @back="goBack" content="编辑" style="margin-bottom: 20px"></el-page-header>
    <div>
      <el-input placeholder="请输入标题" v-model="title" style="margin-bottom: 20px"></el-input>
    </div>
    <mavon-editor class="lang-vue"
                  v-model="content"
                  :ishljs="true"
                  :codeStyle="codeStyle"
                  @save="save"
                  @navigationToggle="addUrl"
                  @imgAdd="imgAdd"
                  ref="md"
                  :xssOptions="{
                      whiteList: {
                        iframe: ['src', 'height', 'width'],
                        video: ['height', 'width', 'controls'],
                        source: ['src', 'type'],
                        div: ['style', 'height', 'width', 'align'],
                      },
                    }"
    >
      <template v-slot:left-toolbar-after>
        <button
          type="button"
          title="文件上传"
          class="op-icon fa markdown-upload iconfont iconupload"
          aria-hidden="true"
          @click="uploadVideo"
        >
          <!-- 这里用的是element-ui给出的图标 -->
          <i class="el-icon-video-camera"/>
        </button>
      </template>
    </mavon-editor>
    <!-- 在这里放一个隐藏的input，用来选择文件 -->
    <input ref="uploadInput" style="display: none" type="file" @change="uploadFileChange($event, uploadVideoCode)">
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
      id: '',
      uploadVideoCode: this.uploadVideoCode,
      uploadFileCode: this.uploadFileCode
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
    // 这是我们自定义的按钮触发的方法，这里也可以在自定义其他功能时做一些其他操作。
    uploadVideo() {
      // 通过ref找到隐藏的input标签，触发它的点击方法
      this.$refs.uploadInput.click()
    },
    // 监听input获取文件的状态
    uploadFileChange(e, fileType) {
      // 获取到input选取的文件
      const file = e.target.files[0]
      // 创建form格式的数据，将文件放入form中，logo是与后台定义的字段
      const formdata = new FormData()
      formdata.append('logo', file)
      // 发送请求，这里是大家各自的axios请求，方法大家按照各自项目更换就好啦
      // 发送请求，这里是大家各自的axios请求，方法大家按照各自项目更换就好啦
      let uri = fileType ? '/file/upload' + '?fileType=' + fileType : '/file/upload'

      this.axios.post(uri, formdata).then(res => {
        // 这里获取到的是mavon编辑器实例，上面挂载着很多方法
        const $vm = this.$refs.md

        let prefix = ''
        let subfix = ''
        let str = ''
        if (fileType === this.uploadVideoCode) {
          prefix = '\n\n<video width="30%" controls>\n'
          subfix = '</video>\n'
          str = '  <source src="' + res.data.data.urlPre + '/' + res.data.data.uri + '" type="video/mp4">\n'
        } else if (fileType === this.uploadFileCode) {
          prefix = `[${file.name}]`
          subfix = ''
          str = '(' + res.data.data.urlPre + '/' + res.data.data.uri + ')'
        }
        // 将文件名与文件路径插入当前光标位置，这是mavon-editor 内置的方法
        $vm.insertText($vm.getTextareaDom(),
          {
            prefix: prefix,
            subfix: subfix,
            str: str
          })
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
