<template>
  <div id="app">
    <!--    <el-row class="tac" id="article" style="height: 100%">-->
    <el-col :span="4">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><B style="font-size: 20px">文章目录</B></span>
        </div>
        <el-tree :props="props"
                 lazy
                 :load="loadNode"
                 accordion
                 :data="nodeData"
                 :highlight-current="isHighlightCurrent"
                 :check-on-click-node="isCheckOnClickNode"
                 @node-click="handleNodeClick">
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="20">
      <h1 id="title">{{ title }}</h1>
      <el-row>
        <el-col :span="2" style="float: right">
          <delete :articleId="articleId" :title="title" :disabled="!isDisplayEditButton"></delete>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-dropdown @command="create">
            <el-button type="primary">+ 新增文章<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="parentId">在本文章的同级目录创建文章</el-dropdown-item>
              <el-dropdown-item :command="articleId" v-if="isDisplayEditButton">创建本文章的子文章</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <mavon-editor class="lang-vue" :toolbars="toolbars"
                    v-model="content"
                    :subfield="subfield"
                    :defaultOpen="'preview'"
                    :editable="editable"
                    :codeStyle="'agate'"
                    @navigationToggle="addUrl"
                    :fontSize="'18px'"
                    :xssOptions="xssOptions"
      >
        <template v-slot:right-toolbar-after v-if="isDisplayEditButton">
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
      nodeData: [],
      isHighlightCurrent: true,
      isCheckOnClickNode: true,
      createNewArticleId: sessionStorage.getItem('createNewArticleId') ? sessionStorage.getItem('createNewArticleId') : 0,
      articleIdStack: sessionStorage.getItem('articleIdStack') ? JSON.parse(sessionStorage.getItem('articleIdStack')) : [],
      parentArticleIdStack: sessionStorage.getItem('parentArticleIdStack') ? JSON.parse(sessionStorage.getItem('parentArticleIdStack')) : [],
      // articleId: this.articleIdStack ? this.articleIdStack[this.articleIdStack.length - 1] : 0,
      articleId: sessionStorage.getItem('articleId') ? sessionStorage.getItem('articleId') : 1,
      articleList: '',
      // parentId: this.$route.params.parentId ? this.$route.params.parentId : localStorage.getItem('parentId') ? localStorage.getItem('parentId') : 0,
      // parentId: this.parentArticleIdStack ? this.parentArticleIdStack[this.parentArticleIdStack.length - 1] : 0,
      parentId: 0,
      xssOptions: this.xssOptions,
      showBack: false, // 显示目录后退按钮
      editable: false, // 是否启动编辑
      subfield: false, // 是否双栏显示
      isDisplayEditButton: true,
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
      },
      props: {
        label: 'title',
        children: 'title',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    updateParentId(parentId) {
      this.parentId = parentId
      sessionStorage.setItem('parentId', this.parentId)
    },
    updateArticleId(articleId) {
      this.articleId = articleId
      sessionStorage.setItem('articleId', this.articleId)
      if (parseInt(this.articleId) === 1) {
        this.editable = true
        this.subfield = true
        this.isDisplayEditButton = false
      } else {
        this.editable = false
        this.subfield = false
        this.isDisplayEditButton = true
      }
    },
    addArticleIdStack(articleId) {
      this.articleIdStack.push(articleId)
      sessionStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      sessionStorage.setItem('articleId', this.articleId)
    },
    updateArticleIdStack(articleId) {
      if (this.articleIdStack) {
        this.articleIdStack.pop()
      }
      this.articleIdStack.push(articleId)
      sessionStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      sessionStorage.setItem('articleId', this.articleId)
    },
    updateCreateNewArticleId(articleId) {
      this.createNewArticleId = articleId
      sessionStorage.setItem('createNewArticleId', articleId)
    },
    delArticleIdStack() {
      this.articleIdStack.pop()
      sessionStorage.setItem('articleIdStack', JSON.stringify(this.articleIdStack))
      this.articleId = this.articleIdStack[this.articleIdStack.length - 1]
      sessionStorage.setItem('articleId', this.articleId)
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
    edit() {
      this.$router.push({
        name: 'Edit',
        params: {
          id: this.articleId,
          parentId: this.parentId
        }
      })
    },
    create(parentId) {
      this.$router.push({
        name: 'Create',
        params: {
          parentId: parentId
        }
      })
    },
    list(parentId) {
      parentId = parentId || this.parentId
      if (this.parentId !== 0) {
        this.showBack = true
      }
      return this.axios
        .post('/article/list', {'parentId': parentId})
        .then(response => {
          this.articleList = response.data.data
          return response
        })
    },
    escEvent() {
      if (window.event.keyCode === 27) {
        this.createNewArticleId = this.parentId
        this.articleId = 0
        this.title = ''
        this.content = ''
      }
    },
    async loadNode(node, resolve) {
      let res = null
      if (node.level === 0) {
        res = await this.axios
          .post('/article/list', {'parentId': 0})
          .then(response => {
            this.articleList = response.data.data
            return this.articleList
          })
        return resolve(res)
      } else { // 打开子节点
        // this.detail(node.data.id)
        res = await this.axios
          .post('/article/list', {'parentId': node.data.id})
          .then(response => {
            this.articleList = response.data.data
            if (!this.articleId && this.articleList) {
              this.articleId = this.articleIdStack.length !== 0 ? this.articleIdStack[this.articleIdStack.length - 1] : this.articleList[0].id
              sessionStorage.setItem('articleId', JSON.stringify(this.articleId))
            }
            return this.articleList
          })
        return resolve(res)
      }
    },
    handleNodeClick(data) {
      // alert(JSON.stringify(data))
      this.detail(data.id)
      this.updateArticleId(data.id)
      this.updateParentId(data.parentId)
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
          if (parseInt(this.articleId) === 1) {
            this.editable = true
            this.subfield = true
            this.isDisplayEditButton = false
          } else {
            this.editable = false
            this.subfield = false
            this.isDisplayEditButton = true
          }
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
  width: 95%;
  height: 100%;
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

.active {
  font-weight: bold;
  font-size: 20px;
}

</style>
