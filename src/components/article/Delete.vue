<template>
  <div id="app">
    <el-popconfirm :title="msg" icon-color="red" @confirm="handleDel">
      <el-button slot="reference">删除</el-button>
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    articleId: Number,
    title: String
  },
  data() {
    return {
      msg: '确定要删除《' + this.title + '》这篇文章吗?\n如果删除该文章那么连同在它下面的字文章也会被删除!!',
      dialogVisible: false
    }
  },
  methods: {
    handleDel() {
      this.axios
        .get('/article/delete?id=' + this.articleId)
        .then(() => this.$router.go(0))
    }
  }
}
</script>

<style scoped>

</style>
