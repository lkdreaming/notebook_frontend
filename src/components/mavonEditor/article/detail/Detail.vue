<template>
  <div id="app">
    <!--    <el-row class="tac" id="article" style="height: 100%">-->
    <el-col :span="4">
      <ul id="menu">
        <li id="menu-item" v-for="(article, index) in articleList" :key="index">
          <span @click="detailParent(article.id)"
                :class="{'active': article.id === articleId}">{{ article.title }}</span>
          <ul>
            <li id="menu-item" v-for="(childArticle, index2) in article.childrenArticleVoList" :key="index2">
              <span @click="listChildren(childArticle.parentId, childArticle.id)">{{ childArticle.title }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </el-col>
    <el-col :span="20" style="height: 100%">
      <h1 id="title">{{ title }}</h1>
      <el-row style="margin-bottom: 20px">
        <el-col :span="22">
          <el-page-header @back="goBack" style="margin-bottom: 20px"></el-page-header>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-plus" @click="create">新增文章</el-button>
        </el-col>
      </el-row>
      <mavon-editor class="lang-vue" :toolbars="toolbars"
                    v-model="content"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :editable="false"
                    :codeStyle="'agate'"
                    @navigationToggle="addUrl"
                    :fontSize="'18px'"
                    :xssOptions="{
                      whiteList: {
                        iframe: ['src', 'height', 'width'],
                        video: ['height', 'width', 'controls'],
                        source: ['src', 'type'],
                        div: ['style', 'height', 'width', 'align'],
                      },
                    }"
      >
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
  components: 'Back',
  data() {
    return {
      title: '',
      content: '',
      createNewArticleId: localStorage.getItem('createNewArticleId') ? localStorage.getItem('createNewArticleId') : 0,
      articleIdStack: localStorage.getItem('articleIdStack') ? JSON.parse(localStorage.getItem('articleIdStack')) : [],
      parentArticleIdStack: localStorage.getItem('parentArticleIdStack') ? JSON.parse(localStorage.getItem('parentArticleIdStack')) : [],
      articleId: this.articleIdStack ? this.articleIdStack[this.articleIdStack.length - 1] : '',
      articleList: '',
      // parentId: this.$route.params.parentId ? this.$route.params.parentId : localStorage.getItem('parentId') ? localStorage.getItem('parentId') : 0,
      // parentId: this.parentArticleIdStack ? this.parentArticleIdStack[this.parentArticleIdStack.length - 1] : 0,
      parentId: 0,
      showBack: false, // 显示目录后退按钮
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
    updateParentId(parentId) {
      this.parentId = parentId
      localStorage.setItem('parentId', this.parentId)
    },
    addArticleIdStack(articleId) {
      this.articleIdStack.push(articleId)
      localStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      localStorage.setItem('articleId', this.articleId)
    },
    updateArticleIdStack(articleId) {
      if (this.articleIdStack) {
        this.articleIdStack.pop()
      }
      this.articleIdStack.push(articleId)
      localStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      localStorage.setItem('articleId', this.articleId)
    },
    updateCreateNewArticleId(articleId) {
      this.createNewArticleId = articleId
      localStorage.setItem('createNewArticleId', articleId)
    },
    delArticleIdStack() {
      this.articleIdStack.pop()
      localStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      localStorage.setItem('articleId', this.articleId)
    },
    addParentArticleIdStack(parentId) {
      this.parentArticleIdStack.push(parentId)
      localStorage.setItem('parentArticleIdStack', JSON.stringify(this.parentArticleIdStack))
      this.parentId = this.parentArticleIdStack[this.parentArticleIdStack.length - 1]
    },
    updateParentArticleIdStack(parentId) {
      if (this.parentArticleIdStack) {
        this.parentArticleIdStack.pop()
      }
      this.parentArticleIdStack.push(parentId)
      localStorage.setItem('parentArticleIdStack', JSON.stringify(this.parentArticleIdStack))
      this.parentId = this.parentArticleIdStack[this.parentArticleIdStack.length - 1]
    },
    delParentArticleIdStack() {
      this.parentArticleIdStack.pop()
      localStorage.setItem('parentArticleIdStack', JSON.stringify(this.parentArticleIdStack))
      this.parentId = this.parentArticleIdStack[this.parentArticleIdStack.length - 1]
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
    async detail(articleId) {
      // eslint-disable-next-line no-return-await
      return await this.axios
        .get('/article/detail', {
          params: {
            'id': articleId
          }
        })
        .then(response => {
          this.content = response.data.data.content
          this.articleId = response.data.data.id
          this.title = response.data.data.title
          this.updateParentId(response.data.data.parentId)
          return response
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    async detailParent(articleId) {
      let res = await this.detail(articleId)
      let newParentId = res.data.data.parentId
      if (parseInt(newParentId) === parseInt(this.parentId)) {
        console.log('\'1111111111111111sa\'')
        this.updateArticleIdStack(this.articleId)
      } else {
        console.log('\'22222222222222222sa\'')
        this.addArticleIdStack(this.articleId)
        this.parentId = newParentId
      }
      this.updateArticleIdStack(this.articleId)
      this.updateCreateNewArticleId(this.articleId)
    },
    async detailChild(articleId, parentArticleId) {
      await this.detail(articleId)
      this.addArticleIdStack(articleId)
    },
    edit() {
      console.log('edit: ' + this.articleId)
      // this.addArticleIdStack(this.articleId)
      this.$router.push({
        name: 'Edit',
        params: {
          id: this.articleId,
          parentId: this.parentId
        }
      })
    },
    create() {
      // this.addArticleIdStack(this.articleId)
      this.$router.push({
        name: 'Create',
        params: {
          parentId: this.createNewArticleId
        }
      })
    },
    async list(parentId, articleId) {
      parentId = parentId || this.parentId
      console.log('list().parentId: ' + parentId)
      if (this.parentId !== 0) {
        this.showBack = true
      }
      let res = await this.axios
        .post('/article/list', {'parentId': parentId})
        .then(response => {
          this.articleList = response.data.data
          if (!this.articleId && this.articleList) {
            this.articleId = this.articleIdStack.length !== 0 ? this.articleIdStack[this.articleIdStack.length - 1] : this.articleList[0].id
            localStorage.setItem('articleId', JSON.stringify(this.articleId))
          }
          return response
        })
      // 子目录点进去后, 展示详情.
      if (articleId) {
        await this.detail(articleId)
      }
      return res
    },
    async listChildren(parentId, articleId) {
      await this.list(parentId, articleId)
      await this.addArticleIdStack(articleId)
      await this.updateCreateNewArticleId(articleId)
    },
    async goBack() {
      await this.delArticleIdStack()
      let res = await this.axios
        .get('/article/detail', {
          params: {
            'id': this.parentId
          }
        })
        .then(response => {
          return response
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
      await this.list(res.data.data.parentId)
      await this.detail(this.articleId)
      console.log('this.articleId: ' + this.articleId)
    },
    escEvent() {
      if (window.event.keyCode === 27) {
        this.createNewArticleId = this.parentId
        this.articleId = 0
        this.title = ''
        this.content = ''
      }
    }
  },
  created() {
    document.addEventListener('keydown', this.escEvent)
  },
  async mounted() {
    console.log('this.parentId: ' + this.parentId)
    // console.log('this.articleId: ' + this.articleId)
    await Promise.all(
      [this.list()]
    ).then(() => {
      this.axios
        .get('/article/detail', {
          params: {
            'id': this.articleId,
            'parentId': this.parentId
          }
        })
        .then(response => {
          this.content = response.data.data.content
          this.title = response.data.data.title
          // this.updateArticleIdStack(this.articleId)
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
  width: 90%;
  height: 100%;
  margin: 50px auto;
}

#app .lang-vue {
  font-size: 20px;
}

#title {
  font-size: 60px;
  margin-bottom: 50px;
}

#menu {
  text-align: left;
}

#menu-item {
  margin: 5px;
}

.active {
  font-weight: bold;
  font-size: 20px;
}

</style>
