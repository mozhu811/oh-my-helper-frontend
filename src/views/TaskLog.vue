<template>
  <v-container>
    <v-toolbar elevation="0">
      <v-btn
        icon
        x-large
        color="primary"
        elevation="10"
        @click="$router.back()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

<!--      <v-toolbar-title>运行日志</v-toolbar-title>-->
    </v-toolbar>
    <v-textarea
      class="mt-3"
      no-resize
      readonly
      outlined
      rows="20"
      name="input-7-4"
      label="运行日志"
      :value="logText"
    ></v-textarea>

    <v-overlay
      color="#212121"
      light opacity="0.10" :value="overlay">
      <v-progress-circular
        indeterminate
        size="100"
      >Loading...</v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'FunctionHistory',
  data () {
    return {
      dedeuserid: '',
      logText: '',
      overlay: false
    }
  },
  created () {
    this.dedeuserid = this.$route.query.dedeuserid
    this.listLogs()
  },
  methods: {
    listLogs () {
      this.overlay = true
      const end = Date.now()
      const start = end - 86400000
      this.$http.get(`logs?dedeuserid=${this.dedeuserid}&start=${start}&end=${end}`).then(res => {
        res.data.forEach(log => {
          this.logText = this.logText + '\n' + log
        })
      }).finally(() => {
        this.overlay = false
      })
    }
  }
}
</script>

<style scoped>

</style>
