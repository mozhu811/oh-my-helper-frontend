<template>
  <div>
    <v-card
      :style="backgroundStyle"
      class="scale-transition mx-auto"
      dark
      shaped
      max-width="400"
      transition="scale-transition"
      @mouseleave.stop="show=false"
    >
      <v-img
        :src="avatarUrl"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mb-4 text-md-h6">
            <span class="card-title" style="font-weight: bold">{{ username }}</span>
          </div>
          <v-list-item-title class="mb-1">
            <div v-if="item.medals && JSON.parse(item.medals).length > 0" style="display: flex">
              <medal v-for="(medal, index) in JSON.parse(item.medals)" :key="index" :name="medal.name"
                     :level="medal.level"
                     :color-border="medal.colorBorder" :color-start="medal.colorStart"
                     :color-end="medal.colorEnd">
                {{ medal }}
              </medal>
            </div>
            <div v-else><br></div>
          </v-list-item-title>
          <v-card-text style="margin: 0;padding: 0">
            <div>
              <v-row dense>
                <v-col cols="12" col="12"><span style="vertical-align: middle">等级: </span><img
                  :src="levelImg" style="height: 14px;padding-bottom:1px;vertical-align: middle" alt="6"/></v-col>
                <v-col cols="12" col="12">硬币: <b>{{ this.item.coins || '——' }}</b></v-col>
                <v-col cols="12" col="12"><span>当前经验: <b>{{ this.item.currentExp || '——' }}</b></span></v-col>
                <v-col cols="12" col="12">
                  <span>升级还需: <b>{{ diffExpLabel }}</b></span>
                </v-col>
                <v-col cols="12" col="12">
                  <span>距离升级: <b>{{ upgradeDaysLabel }}</b></span>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
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
            {{ signLabel }}
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
    diffExpLabel: function () {
      if (this.item.level >= 6) {
        return 0
      } else if (this.item.isLogin) {
        return this.item.nextExp - this.item.currentExp
      } else {
        return '——'
      }
    },
    upgradeDaysLabel: function () {
      if (this.item.upgradeDays) {
        return this.item.upgradeDays === -1 ? '你已经是最强的了' : this.item.upgradeDays + '天'
      } else if (this.item.level >= 6) {
        return '你已经是最强的了'
      } else {
        return '——'
      }
    },
    signLabel: function () {
      if (this.item.sign) {
        return this.item.sign.length < 1 ? '这个人非常懒，什么也没有写~\\(≧▽≦)/~' : this.item.sign
      }
      return '这个人非常懒，什么也没有写~\\(≧▽≦)/~'
    },
    levelImg: function () {
      return `/images/lv${this.item.level}.png`
    },
    cardTitleClass: function () {
      if (this.countChar(this.item.username) <= 14) {
        return 'text-md-h6 text-sm-subtitle-1 font-weight-medium'
      }
      return 'text-md-h5 font-weight-medium'
    },
    cardContent: function () {
      return `<div>
      <v-row>
      <v-col cols="12" col="12" lg="12"><span style="vertical-align: middle">等级: </span><img src=/images/lv${this.item.level}.png style="width: 30px;padding-bottom:1px;vertical-align: middle" alt="6"/></v-col>
      <v-col cols="12" col="12">硬币: ${this.item.coins || '——'}</v-col>

      <v-col col="12"><span>当前经验: <b>${this.item.currentExp || '——'}</b></span></v-col>
      <v-col cols="12"><span><br/>升级还需: <b>${this.item.diffExp || '***'}</b></span></v-col>
</v-row>
      </div>`
    },
    avatarUrl: function () {
      return 'https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/' + this.item.dedeuserid + '.png'
    },
    username: function () {
      // if (this.countChar(this.item.username) >= 14) {
      //   return this.item.username.substr(0, 7) + '..'
      // }
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
}
</style>
