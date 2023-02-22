<template>
  <!-- 页面内容 -->
  <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);color: white">
    <h1>OOPS! 请求出错了</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['errorCode', 'errorMessage'],
  name: 'Error',
  data () {
    return {
      message: '',
      status: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.message = this.$route.params.message
      this.status = this.$route.params.status
    })
  }
}
</script>

<style scoped>

</style>
