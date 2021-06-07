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

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <v-btn-->
      <!--          color="primary"-->
      <!--          dark-->
      <!--          v-bind="attrs"-->
      <!--          v-on="on"-->
      <!--        >-->
      <!--          Open Dialog-->
      <!--        </v-btn>-->
      <!--      </template>-->
      <v-card>
        <v-card-title>
          <span class="text-h5">身份验证</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="sessdata"
              :rules="[rules.required]"
              label="SESSDATA"
              placeholder="请填入B站Cookie中SESSDATA的值"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="submitSessData"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    this.dialog = localStorage.getItem('sessdata') === null
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
    },
    submitSessData () {
      const valid = this.$refs.form.validate()
      if (valid) {
        localStorage.setItem('sessdata', this.sessdata)
        this.dialog = false
        this.listFunctions()
      }
    }
  }
}
</script>
