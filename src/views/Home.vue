<template>
  <v-container>
    <hello-world/>
    <v-btn
      v-show="!overlay"
      class="mx-2"
      fab
      dark
      color="primary"
      elevation="10"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <div class="mt-5">
      <v-row>
        <v-col cols="3" xl="3" md="4" v-for="(item, i) in items" :key="i">
          <container-card :item="item"></container-card>
        </v-col>
      </v-row>
    </div>

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
import ContainerCard from '@/components/ContainerCard'
import HelloWorld from '@/components/HelloWorld'
export default {
  components: {
    ContainerCard,
    HelloWorld
  },
  created () {
    this.listFunctions()
  },
  data () {
    return {
      items: [],
      overlay: false
    }
  },
  methods: {
    listFunctions () {
      this.overlay = true
      this.$http.get('functions').then(res => {
        this.items = res.data
      }).finally(() => {
        this.overlay = false
      })
    }
  }
}
</script>
