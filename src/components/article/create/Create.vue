<template>
  <div id="app">
    <el-page-header @back="goBack" content="编辑" style="margin-bottom: 20px"></el-page-header>
    <editor :title="title" :content="content" :id="articleId" :parentId="parentId"></editor>
  </div>
</template>

<script>
export default {
  name: 'Create',
  components: 'editor',
  data: function () {
    return {
      title: '',
      content: '',
      codeStyle: 'agate',
      articleId: null,
      opsType: this.editTypeCreate,
      parentId: this.$route.params.parentId ? this.$route.params.parentId : 0,
      uploadVideoCode: this.uploadVideoCode,
      uploadFileCode: this.uploadFileCode,
      xssOptions: this.xssOptions
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getDetail()
    // })
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
