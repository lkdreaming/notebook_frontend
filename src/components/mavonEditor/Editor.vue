<template>
  <div id="app">
    <div>
      <el-input placeholder="请输入标题" v-model="title" style="margin-bottom: 20px"></el-input>
    </div>
    <mavon-editor class="lang-vue" v-model="content"
                  :ishljs="true"
                  :codeStyle="codeStyle"
                  @save="save"
                  @navigationToggle="addUrl"
                  @imgAdd="imgAdd"
                  ref="md"
                  :xssOptions="xssOptions"
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
  name: 'Editor',
  props: {
    title: String,
    content: String,
    parentId: Number,
    id: Number
  },
  data: function () {
    return {
      codeStyle: 'agate',
      uploadVideoCode: this.uploadVideoCode,
      uploadFileCode: this.uploadFileCode,
      xssOptions: this.xssOptions,
      rules: {
        name: [{required: true, message: '请输入标题'}]
      }
    }
  },
  getArticleId() {
    return this.$refs.md.id
  },
  methods: {
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
          prefix = '\n\n<video width="60%" controls>\n'
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
    async imgAdd(pos, $file) {
      var formData = new FormData()
      formData.append('image', $file)
      await this.axios.post('/file/upload',
        formData).then(response => {
        this.$refs.md.$img2Url(pos, process.env.FIGURE_BED_URL + '/' + response.data.data.uri)
      }).catch(function (error) { // 请求失败处理
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
    async save(val) {
      // 获取预览文本
      // console.log(this.content) // 这里是原markdown文本
      // console.log(val) // 这个是解析出的html
      if (!this.title) {
        this.$message.error('title不能为空')
        return
      }
      await this.axios
        .post('/article/addOrUpdate', {
          'id': this.id,
          'parentId': this.parentId,
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
      // if (this.opsType === this.editTypeCreate) {
      //   this.$router.go(-1)
      // }
    }
  }
}
</script>

<style scoped>

</style>
