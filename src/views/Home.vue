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
        <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="(item, i) in items" :key="i">
          <card :item="item"></card>
        </v-col>
      </v-row>
    </div>

    <v-overlay
      color="#212121"
      light opacity="0.10" :value="overlay">
      <v-progress-circular
        indeterminate
        size="100"
      >Loading...
      </v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import Card from '@/components/Card'
import HelloWorld from '@/components/HelloWorld'
export default {
  components: {
    Card,
    HelloWorld
  },
  created () {
    this.listFunctions()
  },
  data () {
    return {
      items: [],
      overlay: false,
      sessdata: '',
      valid: false,
      dialog: true,
      rules: {
        required: value => !!value || 'Required.'
      }
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
