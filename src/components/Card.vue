<template>
  <div>
    <v-card
      :style="backgroundStyle"
      :class="item.isLogin?'scale-transition' : 'scale-transition'"
      dark
      shaped
      max-width="450"
      transition="scale-transition"
      @mouseleave.stop="show=false"
    >
      <div class="d-flex justify-space-between">
        <div>
          <v-card-title
            class="text-md-h5 font-weight-medium card-title"
            v-html="username"
          >
          </v-card-title>
          <v-card-subtitle>
            <div v-if="item.medals && JSON.parse(item.medals).length > 0" style="display: flex">
              <medal v-for="(medal, index) in JSON.parse(item.medals)" :key="index" :name="medal.name"
                     :level="medal.level"
                     :color-border="medal.colorBorder" :color-start="medal.colorStart"
                     :color-end="medal.colorEnd">
                {{ medal }}
              </medal>
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
          offset-y="70"
        >
          <template v-slot:badge>
            <v-avatar>
              <v-img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAh1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////7cpn////8g6b/7vL8p7/+3Ob9sMb8lbL9ytj9uMz9wdL/9/n+ytn7e5/+5ez8jKz7ep/+09/8nrj8nrn7jKz7e6D9p7/9wdNOsRhSAAAAFXRSTlMA3yAQoEDP75CA3r+PYFAwf65w7rAb9/MjAAADDElEQVRYw51X2WKjMAyEBAg5e+xiMJib0KTt/3/flvUhx7KBZt4a5KlmJITsObG9vAdHf0J0DPbh1vslwtgnBqI4XH9++7ojVvjnzSqCTQwEGMHm6QwAr0se+GQR/qwnJz00a4uPdMLAijFbl8gmgqi8+EwekNJeq87GwQAiSpZYMJQgxsrxohjGNHEgLYFjJoeMJTOgGeJADCV4YEU6Sg6z5SVDlSyiEqFHezULiFzmOOkMZxvDtR7HIp3jCA0jkArGvelcHGAHyCiNwJxXSCaCH5G9SkJU06xFIRo1weh4bXcyjYCHMhTXoAegEtKAJEpnunVik6LSgCSkZKyktbaYnoYvksCgDxTDjd40TSUvysQQQhKIAmrN8oZ72xluhEoH2I6FUFY1RKI23IiVDmqjGIkF7PEfRKIeWMd1KNqe2FAbhm69i6Hjo6jatm+IE1Af3l4XL36k7iB2kaIlE969NzLhI5FYpKCG24EXGT1sNaDp24r+4EcjS0CzmDy+4WaFzufVkFhxF83Fw9C7BSjcY9SkAIXNNx0+pdQyWU8BTx66j62mwKDQMPMUyk6ETJWwbutb6rQzEhSDY8Jm6pXs69Q+uY6itShOEn4vZXWp7UX+azS4xDVTSUxK1MqhSIB6752xa3Co1FWhTwJv5FC+7B1KkbuMOJov9LJ7O2zGvUFDvcAzh/KCWAdfmqlgAFONn6PBF4ISYIBY/DMRf8P43XIlFQ6liZWjQR8Bb88fdLyaMKwz1Cu9dAiSeJcfRGiNDKy39HQtJhz0m9i4jpp5uWK4O5aTTJtYJDCWg0lKJ9hzx+JYZFT3Ra19sS4lrdr2myXzKI0VhRcFZtzqhe2g7Y0XwvE1dw636tnTEAPHKgaQAVKeWF0j1wJdd/MEVzmADht0EdjBRJgByzAD5iDlisvEwXUhmSdJ6wYxYD8URno1PChyfLHC2AZEQ17fWDodTgda90TDae72ffbJIg7hwl05WGLYQwpPkMCFe5nEIecPZLCMC2Y5nELvl3i5xMfI/384ejud3QL+AW4LJEWZOPxvAAAAAElFTkSuQmCC"></v-img>
            </v-avatar>
          </template>

          <v-avatar size="120">
            <v-img :src="avatarUrl"/>
          </v-avatar>
        </v-badge>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ item.sign }}
          </v-card-text>
        </div>
      </v-expand-transition>

      <div v-show="!item.isLogin" class="seal-text">
        <h1 style="text-align: center;
         font-weight: bold;
         font-size: 48px;
         color: gainsboro;
         -webkit-text-stroke: 1px lightgray;
         -webkit-text-fill-color: transparent;">Expired</h1>
      </div>
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
      ],
      show: false,
      boxShadow: '0 0 10px #8f7eff'
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
    countChar (str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          len += 2
        } else {
          len++
        }
      }
      return len
    }
  },
  computed: {
    cardTitleClass: function () {
      if (this.countChar(this.item.username) <= 14) {
        return 'text-md-h6 text-sm-subtitle-1 font-weight-medium'
      }
      return 'text-md-h5 font-weight-medium'
    },
    cardContent: function () {
      // return `等级: <b>LV${this.item.level}</b>   硬币: <b>${this.item.coins || '——'}</b>
      //           <br/>
      //           当前经验: <b>${this.item.currentExp || '——'}</b>
      //           <br/>升级还需: <b>${this.item.diffExp || '——'}</b>
      //           <br/>距离升级: <b>${this.item.upgradeDays ? this.item.upgradeDays + ' 天' : '——'}`
      return `<div style="display: flex; align-items: center">
              <span>等级: </span>
              <img src=/images/lv${this.item.level}.png style="width: 30px;padding: 1px" alt="6"/>
              <span>硬币: <b>${this.item.coins || '——'}</b></span></div>
              <span>当前经验: <b>${this.item.currentExp || '——'}</b></span>
              <span><br/>升级还需: <b>${this.item.diffExp || '——'}</b></span>
              <br/>距离升级: <b>${this.item.upgradeDays ? this.item.upgradeDays + ' 天' : '——'}`
    },
    avatarUrl: function () {
      return 'https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/' + this.item.dedeuserid + '.png'
    },
    username: function () {
      if (this.countChar(this.item.username) >= 14) {
        return this.item.username.substr(0, 7) + '..'
      }
      return this.item.username
    },
    activeLogBtn: function () {
      const dedeuserid = this.$cookies.get('dedeuserid')
      if (dedeuserid) {
        return dedeuserid === this.item.dedeuserid
      }
      return false
    },
    backgroundStyle: function () {
      if (this.item.isLogin) {
        // if (this.item.level === 6) {
        return 'background-image: linear-gradient(315deg, #fc6076 0%, #ff9a44 100%);' +
          // 'box-shadow' + this.boxShadow
          'box-shadow: 0px 10px 20px #e74e34;'
        // }
        // return 'background-color: #f794a4;background-image: linear-gradient(315deg, #f794a4 0%, #fdd6bd 100%);' +
        //   'box-shadow: 0px 10px 20px #fdd6bd;'
      }
      return 'background-color: #9E9E9E;background: linear-gradient(to bottom right, #9E9E9E, #424242);' +
        'box-shadow: 0px 10px 20px #424242;'
    }
  }
}
</script>

<style>
.scale-transition {
  transition: all 0.3s ease;
}

.scale-transition:hover {
  transform: scale(1.03);
}

.seal {
  position: relative;
}

.seal-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  text-align: center;
}

.dynamic-shadow {
  animation: change-shadow 5s linear infinite;
}

@keyframes change-shadow {
  0% {
    box-shadow: 0 0 10px #ff9a44;
  }
  25% {
    box-shadow: 0 0 10px #fc6076;
  }
  50% {
    box-shadow: 0 0 10px #db5e77;
  }
  75% {
    box-shadow: 0 0 10px #e74e34;
  }
  100% {
    box-shadow: 0 0 10px #ff9a44;
  }
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
