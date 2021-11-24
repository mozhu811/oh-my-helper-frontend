<template>
  <div>
    <v-card
      :color="item.isLogin ? item.level === 6 ? 'red lighten-1' : 'primary lighten-1' : 'grey darken-2'"
      dark
      elevation="10"
      shaped
      max-width="450"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="text-md-h5 font-weight-medium"
            v-html="username"
          >
          </v-card-title>
          <v-card-subtitle>
            <div v-if="item.medals.length > 0" style="display: flex">
              <medal v-for="(medal, index) in item.medals" :key="index" :name="medal.name" :level="medal.level"
              :color-border="medal.colorBorder" :color-start="medal.colorStart" :color-end="medal.colorEnd"></medal>
            </div>
            <div v-else><br></div>
          </v-card-subtitle>
          <v-card-text v-html="cardContent"></v-card-text>
        </div>

        <v-badge
          :value="item.vipStatus === 1"
          avatar
          bordered
          bottom
          class="ma-3"
          offset-x="40"
          offset-y="60"
        >
          <template v-slot:badge>
            <v-avatar>
              <v-img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAh1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////7cpn////8g6b/7vL8p7/+3Ob9sMb8lbL9ytj9uMz9wdL/9/n+ytn7e5/+5ez8jKz7ep/+09/8nrj8nrn7jKz7e6D9p7/9wdNOsRhSAAAAFXRSTlMA3yAQoEDP75CA3r+PYFAwf65w7rAb9/MjAAADDElEQVRYw51X2WKjMAyEBAg5e+xiMJib0KTt/3/flvUhx7KBZt4a5KlmJITsObG9vAdHf0J0DPbh1vslwtgnBqI4XH9++7ojVvjnzSqCTQwEGMHm6QwAr0se+GQR/qwnJz00a4uPdMLAijFbl8gmgqi8+EwekNJeq87GwQAiSpZYMJQgxsrxohjGNHEgLYFjJoeMJTOgGeJADCV4YEU6Sg6z5SVDlSyiEqFHezULiFzmOOkMZxvDtR7HIp3jCA0jkArGvelcHGAHyCiNwJxXSCaCH5G9SkJU06xFIRo1weh4bXcyjYCHMhTXoAegEtKAJEpnunVik6LSgCSkZKyktbaYnoYvksCgDxTDjd40TSUvysQQQhKIAmrN8oZ72xluhEoH2I6FUFY1RKI23IiVDmqjGIkF7PEfRKIeWMd1KNqe2FAbhm69i6Hjo6jatm+IE1Af3l4XL36k7iB2kaIlE969NzLhI5FYpKCG24EXGT1sNaDp24r+4EcjS0CzmDy+4WaFzufVkFhxF83Fw9C7BSjcY9SkAIXNNx0+pdQyWU8BTx66j62mwKDQMPMUyk6ETJWwbutb6rQzEhSDY8Jm6pXs69Q+uY6itShOEn4vZXWp7UX+azS4xDVTSUxK1MqhSIB6752xa3Co1FWhTwJv5FC+7B1KkbuMOJov9LJ7O2zGvUFDvcAzh/KCWAdfmqlgAFONn6PBF4ISYIBY/DMRf8P43XIlFQ6liZWjQR8Bb88fdLyaMKwz1Cu9dAiSeJcfRGiNDKy39HQtJhz0m9i4jpp5uWK4O5aTTJtYJDCWg0lKJ9hzx+JYZFT3Ra19sS4lrdr2myXzKI0VhRcFZtzqhe2g7Y0XwvE1dw636tnTEAPHKgaQAVKeWF0j1wJdd/MEVzmADht0EdjBRJgByzAD5iDlisvEwXUhmSdJ6wYxYD8URno1PChyfLHC2AZEQ17fWDodTgda90TDae72ffbJIg7hwl05WGLYQwpPkMCFe5nEIecPZLCMC2Y5nELvl3i5xMfI/384ejud3QL+AW4LJEWZOPxvAAAAAElFTkSuQmCC"></v-img>
            </v-avatar>
          </template>

          <v-avatar size="125">
            <v-img :src="avatarUrl"/>
          </v-avatar>
        </v-badge>
      </div>
      <v-card-actions>
        <!--        <v-btn-->
        <!--          class="ml-2 mt-5"-->
        <!--          outlined-->
        <!--          rounded-->
        <!--          small-->
        <!--          :disabled="!activeLogBtn"-->
        <!--          @click="goLogPage(item.dedeuserid)"-->
        <!--        >-->
        <!--          查看日志-->
        <!--        </v-btn>-->
        <v-spacer></v-spacer>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
import Medal from '@/components/Medal'
export default {
  components: { Medal },
  props: {
    item: Object
  },
  data () {
    return {
      medalNum: 3,
      selectedItem: '',
      menuList: [
        '重新部署'
      ]
    }
  },
  methods: {
    goLogPage (dedeuserid) {
      this.$router.push({
        path: 'logs',
        query: {
          dedeuserid: dedeuserid
        }
      })
    },
    countChinese (str) {
      const m = str.match(/[\u4e00-\u9fff\uf900-\ufaff]/g)
      return (!m ? 0 : m.length)
    }
  },
  computed: {
    cardTitleClass: function () {
      if (this.countChinese(this.item.username) > 7 || this.item.username.length >= 10) {
        return 'text-md-h6 text-sm-subtitle-1 font-weight-medium'
      }
      return 'text-md-h5 font-weight-medium'
    },
    cardContent: function () {
      return `等级: <b>LV${this.item.level}</b>   硬币: <b>${this.item.coins || '——'}</b>
                <br/>
                当前经验: <b>${this.item.currentExp || '——'}</b>
                <br/>升级还需: <b>${this.item.diffExp || '——'}</b>
                <br/>距离升级: <b>${this.item.upgradeDays ? this.item.upgradeDays + ' 天' : '——'}`
    },
    avatarUrl: function () {
      return 'https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/' + this.item.dedeuserid + '.png'
    },
    username: function () {
      if (this.countChinese(this.item.username) > 7) {
        return this.item.username.substr(0, 7) + '..'
      } else if (this.countChinese(this.item.username) >= 3 && this.item.username.length >= 10) {
        return this.item.username.substr(0, 8) + '..'
      } else if (this.item.username.length >= 14) {
        return this.item.username.substr(0, 14) + '..'
      }
      return this.item.username
    },
    activeLogBtn: function () {
      const dedeuserid = this.$cookies.get('dedeuserid')
      if (dedeuserid) {
        return dedeuserid === this.item.dedeuserid
      }
      return false
    }
  }
}
</script>

<style scoped>
</style>
