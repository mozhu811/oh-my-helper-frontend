<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <i style="font-size: 40px; padding-right: 10px" class="fa-brands fa-bilibili"></i>
      <v-toolbar-title class="font-weight-bold">Bilibili Helper Hub</v-toolbar-title>
      <v-spacer></v-spacer>

      <div style="margin-right: 10px">
        <v-menu
          bottom
          min-width="200px"
          rounded
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              x-large
              v-on="on"
            >
              <v-avatar
                color="grey lighten-2"
              >
                <v-img v-if="user" :src="user.avatar"></v-img>
                <span v-else class="primary--text">登录</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <div v-if="user">
                  <v-btn
                    depressed
                    rounded
                    text
                    @click="removeTaskDialogVisible =true">
                    删除任务
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    @click.stop="logOut"
                    depressed
                    rounded
                    text>
                    退出登录
                  </v-btn>
                </div>
                <v-btn
                  v-else
                  depressed
                  rounded
                  text
                  @click.stop="showLoginDialog"
                >
                  立即登录
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="primary white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="item in icons"
            :key="item.icon"
            class="mx-4 white--text"
            icon
            @click="toUrl(item.url)"
          >
            <v-icon size="24px">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          {{ new Date().getFullYear() }} — <strong>cruii.io</strong>
        </v-card-text>
        <v-divider/>
      </v-card>
    </v-footer>

    <v-dialog
      v-model="loginDialogVisible"
      max-width="528px"
    >
      <v-card>
        <v-card-text>
          <div class="qrcode-login">
            <div class="qrcode-con">
              <i class="tv-icon"/>
              <div class="qrcode-box">
                <div class="qrcode-img">
                  <v-img height="140" width="140"
                         :src="qrCode"/>
                </div>
                <div class="status" v-if="overdue" @click.stop="getQrCode">
                  <div class="overdue">立即刷新</div>
                </div>
              </div>
              <div class="qrcode-footer">
                <p class="status-txt">扫描二维码登录</p>
                <p class="suc-txt" style="margin-bottom: 0">
                  请使用
                  <a href="//app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>
                  <br>
                  扫码登录
                  <br>
                  或扫码下载APP
                </p>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="removeTaskDialogVisible"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          删除任务
        </v-card-title>
        <v-card-text><v-icon left color="orange">mdi-alert</v-icon>确认删除任务？该操作不可逆</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="removeTaskDialogVisible = false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            text
            :loading="removeTaskLoading"
            @click="removeTask"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      top
      app
      :timeout="3000"
    >
      {{ snackbarMsg }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
const ONE_MONTH = 60 * 60 * 24 * 31
export default {
  name: 'App',

  data: () => ({
    userInfo: {
      username: null,
      avatar: null,
      level: null
    },
    code: -1,
    snackbarMsg: '',
    snackbar: false,
    removeTaskDialogVisible: false,
    loginDialogVisible: false,
    removeTaskLoading: false,
    overdue: true,
    qrCode: null,
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
    ],
    timer: null
  }),
  mounted () {
    // 获取用户信息
    this.getBilibiliUser()
  },
  methods: {
    ...mapMutations(['setUser', 'listUsers']),
    async getQrCode () {
      this.overdue = false
      await this.$http.get('bilibili/qrCode').then(res => {
        this.qrCode = res.data.qrCodeImg
        const oauthKey = res.data.oauthKey
        this.timer = setInterval(() => {
          this.$http.get(`bilibili/login?oauthKey=${oauthKey}`).then(res => {
            if (res.data.code === 0) {
              this.$cookies.set('dedeuserid', res.data.dedeuserid, ONE_MONTH * 12, '/', '.cruii.io')
              this.$cookies.set('sessdata', res.data.sessdata, ONE_MONTH * 12, '/', '.cruii.io')
              this.$cookies.set('biliJct', res.data.biliJct, ONE_MONTH * 12, '/', '.cruii.io')
              // this.$cookies.set('dedeuserid', res.data.dedeuserid, ONE_MONTH * 12, '/')
              // this.$cookies.set('sessdata', res.data.sessdata, ONE_MONTH * 12, '/')
              // this.$cookies.set('biliJct', res.data.biliJct, ONE_MONTH * 12, '/')
              clearInterval(this.timer)
              this.getBilibiliUser()
              this.loginDialogVisible = false
            } else if (res.data.code === -2) {
              this.overdue = true
              clearInterval(this.timer)
            }
          })
        }, 1000)
      })
    },
    showLoginDialog () {
      this.loginDialogVisible = true
      this.getQrCode()
    },
    async getBilibiliUser () {
      const dedeuserid = this.$cookies.get('dedeuserid')
      const sessdata = this.$cookies.get('sessdata')
      if (dedeuserid && sessdata) {
        await this.$http.get(`bilibili/user?dedeuserid=${dedeuserid}&sessdata=${sessdata}`).then(res => {
          this.setUser(res.data)
        }).catch(err => {
          if (err.response.status === 401) {
            this.snackbarMsg = err.response.data.message
            this.snackbar = true
            this.logOut()
          }
        })
      }
    },
    removeTask () {
      this.removeTaskLoading = true
      this.$http.delete('tasks').then(res => {
        this.snackbarMsg = '😃 删除成功'
        this.snackbar = true
        this.listUsers()
      }).finally(() => {
        this.removeTaskDialogVisible = false
        this.removeTaskLoading = false
      })
    },
    logOut () {
      this.$cookies.remove('dedeuserid')
      this.$cookies.remove('sessdata')
      this.$cookies.remove('biliJct')
      this.setUser(null)
    },
    toUrl (url) {
      window.open(url, '_blank')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    loginDialogVisible: function (newVal, oldVal) {
      if (!newVal) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>
