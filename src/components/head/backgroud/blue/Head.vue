<template>
  <div id="head">
    <Button></Button>
  </div>
</template>

<script>
import Button from '../../button/Button'

export default {
  name: 'Head.vue',
  components: {
    Button
  }
}
</script>

<style scoped>
#head {
  background-color: #4a5f88;
  height: 80px;
  width: 100%;
}
</style>
