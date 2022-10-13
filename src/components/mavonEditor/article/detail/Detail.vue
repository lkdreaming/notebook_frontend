<template>
  <div id="app">
    <h1 id="title">{{ title }}</h1>
    <mavon-editor class="lang-vue" :toolbars="toolbars"
                  v-model="content"
                  :subfield="false"
                  :defaultOpen="'preview'"
                  :editable="false"
                  :codeStyle="'agate'"
                  @navigationToggle="addUrl"
                  :fontSize="'18px'">
    </mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      title: '',
      content: '',
      toolbars: {
        bold: false, // 粗体
        italic: false, // 斜体
        header: false, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        code: false, // code
        table: false, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: false, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: false // 预览
      }
    }
  },
  methods: {
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
    this.axios
      .get('/article/detail', {
        params: {
          'id': '1579006856955691008'
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
  width: 90%;
  height: 500px;
  margin: 50px auto;
}

#app .lang-vue {
  font-size: 20px;
}

#title {
  font-size: 60px;
}

</style>
