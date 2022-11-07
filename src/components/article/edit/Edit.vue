<template>
  <div id="app">
    <el-page-header @back="goBack" content="编辑" style="margin-bottom: 20px"></el-page-header>
    <editor :title="title" :content="content" :parentId="parentId" :id="id"></editor>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  components: 'editor',
  data: function () {
    return {
      title: '',
      content: '',
      codeStyle: 'agate',
      id: null,
      parentId: 0,
      opsType: this.editTypeEdit,
      uploadVideoCode: this.uploadVideoCode,
      uploadFileCode: this.uploadFileCode,
      xssOptions: this.xssOptions
    }
  },
  methods: {
    getDetail() {
      console.log(sessionStorage.getItem('articleId'))
      // eslint-disable-next-line no-useless-escape
      let id = this.$route.params.id ? this.$route.params.id : sessionStorage.getItem('articleId').replaceAll('\"', '')
      console.log('getDetail id: ' + id)
      this.axios
        .get('/article/detail', {
          params: {
            'id': id
          }
        })
        .then(response => {
          this.content = response.data.data.content
          this.title = response.data.data.title
          this.id = this.$route.params.id ? this.$route.params.id : sessionStorage.getItem('articleId')
          this.parentId = this.$route.params.parentId ? this.$route.params.parentId : sessionStorage.getItem('parentId')
          sessionStorage.setItem('parentId', this.parentId)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    goBack() {
      this.$router.go(-1)
      // location.reload()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDetail()
    })
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
