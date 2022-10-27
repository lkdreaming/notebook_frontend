<template>
  <div id="app">
    <div>
      <el-input placeholder="请输入标题" :v-model="title" style="margin-bottom: 20px"></el-input>
    </div>
    <v-md-editor :v-model="content" height="400px" :include-level="[1, 6]"></v-md-editor>
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
  }
}
</script>

<style scoped>

</style>
