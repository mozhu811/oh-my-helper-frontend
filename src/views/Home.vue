<template>
  <div>
    <v-app style="background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)">
      <v-app-bar app color="#f0945d" dark elevation="2">
        <v-app-bar-nav-icon @click.stop="expand">
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="toUrl('https://github.com/Cruii/oh-my-helper')">
          <v-icon>mdi-github</v-icon>
        </v-btn>

        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                style="background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);font-weight: 600"
                dark
                elevation="0"
              >Sponsor
              </v-toolbar>
              <v-card-text>
                <v-img class="pt-16" contain max-height="300" src="https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/qrcode.png"></v-img>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-menu
          rounded
          offset-y
          offset-x
          transition="scale-transition"
          min-width="300"
          max-height="500"
          origin="right top"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <!--          <v-icon>mdi-bell-badge-outline</v-icon>-->
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </template>
          <v-card max-height="500" class="align-center justify-center">
            <v-card-title>
              <h6 class="text-h6" style="font-weight: 600; color: #212121">Notifications</h6>
            </v-card-title>
            <v-card-text>
              <h4>暂无消息</h4>
            </v-card-text>
          </v-card>
        </v-menu>
        <v-btn v-if="!user" @click.stop="toRoute('/login')" text>登录</v-btn>
        <a href="https://beian.miit.gov.cn/">蜀ICP备2022027307号-1</a>
        <v-menu
          v-else
          bottom
          min-width="200px"
          rounded
          offset-y
          transition="scale-transition"
          origin="right top"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              x-large
              v-on="on"
              class="ma-2"
            >
              <v-avatar
                size="48"
              >
                <v-img src="/images/avatar-1.png"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img src="/images/avatar-1.png"></v-img>
                </v-avatar>
                <h3 class="pt-2">{{ user.nickname }}</h3>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  text
                  block
                  @click.stop="logOut"
                >
                  退出登录
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        :expand-on-hover="$vuetify.breakpoint.lgAndUp"
        width="200"
        color="#f0945d"
        app
        dark
      >
        <v-list-item style="padding: 0 4px">
          <v-list-item-avatar size="48" tile>
            <v-icon x-large>mdi-robot-angry</v-icon>
          </v-list-item-avatar>
          <v-list-item-title><h5
            style="font-family: inter,sans-serif,-apple-system,blinkmacsystemfont,Segoe UI,roboto,Helvetica Neue,arial,sans-serif,Segoe UI Symbol">
            OH MY HELPER</h5></v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav class="pt-10">
          <v-list-item-group
            v-model="selectedItem"
            color="#F6F6F6">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              link
              @click="toRoute(item.route)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title><span style="font-weight: bold">{{ item.title }}</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container ref="container" fluid>
          <router-view/>
        </v-container>
      </v-main>

      <v-snackbar
        v-model="snackbar"
        top
        app
        :timeout="3000"
      >
        {{ snackbarMsg }}
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    code: -1,
    loading: false,
    snackbarMsg: '',
    snackbar: false,
    drawer: true,
    selectedItem: 0,
    items: [
      {
        title: '哔 哩 哔 哩',
        icon: 'fa-brands fa-bilibili',
        route: '/bilibili'
      },
      {
        title: 'Coming Soon',
        icon: 'mdi-help-circle-outline',
        route: '/new'
      }
    ],
    mini: true,
    loginDialogVisible: false,
    overdue: true,
    isQr: true,
    qrCode: null,
    credential: {
      dedeuserid: null,
      sesdata: null,
      biliJct: null
    },
    icons: [
      {
        icon: 'mdi-qqchat',
        url: 'http://wpa.qq.com/msgrd?v=3&uin=949953001&site=qq&menu=yes'
      },
      {
        icon: 'mdi-twitter',
        url: 'https://twitter.com/cruii811'
      },
      {
        icon: 'mdi-sina-weibo',
        url: 'https://weibo.com/2875196650'
      },
      {
        icon: 'mdi-github',
        url: 'https://github.com/Cruii'
      }
    ]
  }),
  created () {
    this.drawer = this.$vuetify.breakpoint.lgAndUp
  },
  mounted () {
    // 获取用户信息
    this.getBilibiliUser()
    this.listUsers({
      page: 1,
      size: 36
    })
  },
  methods: {
    ...mapMutations(['setUser', 'setCols']),
    ...mapActions(['listUsers']),
    expand () {
      if (this.isDesktop) {
        this.drawer = !this.drawer
      } else {
        this.mini = false
        this.drawer = !this.drawer
      }
    },
    getBilibiliUser () {
      this.credential.dedeuserid = this.$cookies.get('dedeuserid')
      this.credential.sesdata = this.$cookies.get('sessdata')
      if (this.credential.dedeuserid && this.credential.sesdata) {
        this.axios.get(`bilibili/user?dedeuserid=${this.credential.dedeuserid}&sessdata=${this.credential.sesdata}`).then(res => {
          this.setUser(res.data)
        }).catch(e => {
          if (e.response.status === 401) {
            this.snackbarMsg = e.response.data.message
            this.snackbar = true
            this.logOut()
          }
        })
      }
    },
    logOut () {
      this.credential.dedeuserid = null
      this.credential.sesdata = null
      this.$cookies.remove('dedeuserid')
      this.$cookies.remove('sessdata')
      this.$cookies.remove('biliJct')
      this.setUser(null)
    },
    toRoute (route) {
      this.$router.push(route)
    },
    toUrl (url) {
      window.open(url, '_blank')
    }
  },
  computed: {
    ...mapState(['user']),
    avatarUrl: function () {
      return 'https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/' + this.$cookies.get('dedeuserid') + '.png'
    },
    isDesktop: function () {
      return this.$vuetify.breakpoint.lgAndUp
    }
  }
}
</script>
<style>
.foot-btn {
  position: fixed;
}

.nav-drawer {
  background-color: #f2f2f2;
}

.v-list-item__title {
  font-size: 16px;
  line-height: 24px;
}

.v-list-item__content {
  padding: 8px 16px;
}

.v-app-bar-title__content {
  width: 300px;
}

.v-btn--active::before, .v-btn:focus::before {
  opacity: 0 !important;
}
</style>
