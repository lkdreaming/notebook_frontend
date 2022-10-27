<!--<template>-->
<!--  <div id="app">-->
<!--    &lt;!&ndash;    <&ndash;&gt;-->
<!--    &lt;!&ndash;    <ul>&ndash;&gt;-->
<!--    &lt;!&ndash;      <li v-for="article in articleList" :key="article">&ndash;&gt;-->
<!--    &lt;!&ndash;        <span>{{ article.title }}</span>&ndash;&gt;-->
<!--    &lt;!&ndash;        <span>{{ article.title }}</span>&ndash;&gt;-->
<!--    &lt;!&ndash;      </li>&ndash;&gt;-->
<!--    &lt;!&ndash;    </ul>&ndash;&gt;-->
<!--    <el-row class="tac">-->
<!--      <el-col :span="4">-->
<!--        <el-menu-->
<!--          default-active="2"-->
<!--          class="el-menu-vertical-demo"-->
<!--          @open="handleOpen"-->
<!--          @close="handleClose"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b">-->
<!--          <div v-for="(article, index) in articleList" :key="article">-->
<!--            <el-submenu :index="index">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span @click="detail(article.id)">{{ article.title }}</span>-->
<!--              </template>-->
<!--              <div v-for="(childArticle, indexChild) in article.childrenArticleVoList" :key="childArticle">-->
<!--                <el-menu-item-group :index="index-indexChild">-->
<!--                  <el-menu-item>{{ childArticle.title }}</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--              </div>-->

<!--            </el-submenu>-->
<!--          </div>-->

<!--        </el-menu>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'List',-->
<!--  data: () => {-->
<!--    return {-->
<!--      articleList: '',-->
<!--      parentId: 0-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    detail: (articleId) => {-->
<!--      alert(articleId)-->
<!--      this.$router.push(-->
<!--        {-->
<!--          'path': '/detail',-->
<!--          'query': {'articleId': articleId}-->
<!--        }-->
<!--      )-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      this.axios-->
<!--        .post('/article/list', {'parentId': this.parentId})-->
<!--        .then(reseponse => {-->
<!--          this.articleList = reseponse.data.data-->
<!--        })-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
