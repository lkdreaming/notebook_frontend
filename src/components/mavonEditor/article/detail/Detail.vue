<template>
  <div id="app">
    <!--    <el-row class="tac" id="article" style="height: 100%">-->
    <el-col :span="4">
      <ul id="menu">
        <el-button style="margin-bottom: 10px">后退</el-button>
        <li id="menu-item" v-for="(article, index) in articleList" :key="article">
          <span @click="detail(article.id, index)" :class="{'active': index === number}">{{ article.title }}</span>
          <ul>
            <li id="menu-item" v-for="childArticle in article.childrenArticleVoList" :key="childArticle">
              <span @click="list(childArticle.parentId, childArticle.id)">{{ childArticle.title }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </el-col>
    <el-col :span="20" style="height: 100%">
      <h1 id="title">{{ title }}</h1>
      <mavon-editor class="lang-vue" :toolbars="toolbars"
                    v-model="content"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :editable="false"
                    :codeStyle="'agate'"
                    @navigationToggle="addUrl"
                    :fontSize="'18px'">
        <template v-slot:right-toolbar-after>
          <button
            type="button"
            title="编辑"
            class="op-icon fa markdown-upload iconfont iconupload"
            aria-hidden="true"
            @click="edit"
          >
            <!-- 这里用的是element-ui给出的图标 -->
            <i class="el-icon-edit-outline"/>
          </button>
        </template>

      </mavon-editor>
    </el-col>
    <!--    </el-row>-->
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      title: '',
      content: '',
      articleId: '',
      articleList: '',
      // parentId: this.$route.params.parentId ? this.$route.params.parentId : localStorage.getItem('parentId') ? localStorage.getItem('parentId') : 0,
      parentId: 0,
      showBack: false, // 显示目录后退按钮
      // indexParent: localStorage.getItem('indexParent'),
      number: localStorage.getItem('number') ? localStorage.getItem('number') : 0,
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
    },
    detail(articleId, index) {
      this.axios
        .get('/article/detail', {
          params: {
            'id': articleId
          }
        })
        .then(response => {
          this.content = response.data.data.content
          this.articleId = response.data.data.id
          localStorage.setItem('articleId', articleId)
          console.log('this.content: ' + this.content)
          this.title = response.data.data.title
          this.number = index
          // this.indexParent = index
          // localStorage.setItem('indexParent', index)
          localStorage.setItem('number', this.number)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    edit() {
      console.log('edit: ' + this.articleId)
      localStorage.setItem('articleId', this.articleId)
      this.$router.push({
        name: 'Edit',
        params: {id: this.articleId}
      })
    },
    list(parentId, articleId) {
      parentId = parentId || this.parentId
      if (parentId !== this.parentId) {
        this.showBack = true
      }
      this.axios
        .post('/article/list', {'parentId': parentId})
        .then(reseponse => {
          this.articleList = reseponse.data.data
        })
      // 子目录点进去后, 展示详情.
      if (articleId) {
        this.detail(articleId)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.list()
    })
    let id = this.articleId ? this.articleId : localStorage.getItem('articleId')
    this.axios
      .get('/article/detail', {
        params: {
          'id': id
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
<style lang="scss" scoped>
#app {
  width: 90%;
  height: 100%;
  margin: 50px auto;
}

#app .lang-vue {
  font-size: 20px;
}

#title {
  font-size: 60px;
}

#menu {
  text-align: left;
}

#menu-item {
  margin: 5px;
}

.active {
  font-weight: bold;
}

</style>
