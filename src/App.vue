<template>
  <v-app style="background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)">
    <v-app-bar clipped-left app color="#f0945d" dark elevation="2">
      <v-app-bar-nav-icon>
        <v-icon size="40">mdi-robot-angry</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title style="font-weight: bold;">
        <span>Oh My Helper</span>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      mini-variant
      width="200"
      color="#f0945d"
      app
      hide-overlay
      bottom
      permanent
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img v-if="credential.dedeuserid" :src="avatarUrl"></v-img>
          <v-btn v-else icon class="primary--text " style="background-color: white"
                 @click="showLoginDialog">登录
          </v-btn>
        </v-list-item-avatar>

        <!--        <v-list-item-title><h4>{{ user ? user.nickname : '' }}</h4></v-list-item-title>-->

        <!--        <v-btn-->
        <!--          icon-->
        <!--          @click.stop="mini = !mini"-->
        <!--        >-->
        <!--          <v-icon>mdi-chevron-left</v-icon>-->
        <!--        </v-btn>-->
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          dense
          class="elevation-1 mt-2"
        >
          <v-tooltip right color="#f0945d">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon
                v-bind="attrs"
                v-on="on"
                @click="$router.push('/bilibili')">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title><span style="font-size: 0.9rem;">{{ item.title }}</span></v-list-item-title>
              </v-list-item-content>
            </template>
            <span style="font-size: 0.9rem;">{{ item.title }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list nav dense>
          <!-- 退出登录 -->
          <v-list-item link class="elevation-1">
            <v-list-item-icon>
              <v-icon @click="logOut">mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title><span style="font-size: 0.9rem;">logout</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-robot-angry</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container ref="container" fluid>
        <router-view/>
      </v-container>
    </v-main>
    <v-dialog
      v-model="loginDialogVisible"
      max-width="528px"
    >
      <v-card>
        <v-card-text>
          <div v-if="isQr" class="qrcode-login">
            <div class="qrcode-con">
              <i class="tv-icon"/>
              <div class="qrcode-box">
                <v-overlay
                  :absolute="true"
                  :value="loading"
                >
                  <v-progress-circular
                    indeterminate
                    size="50"
                    color="white"
                  >
                  </v-progress-circular>
                </v-overlay>
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
                  <br>
                  <!--                  <a @click="isQr = false">扫码不可用？手动登录</a>-->
                </p>
              </div>
            </div>
          </div>

          <div v-else>
            <v-text-field
              label="DEDEUSERID"
              hint="你的B站数字ID"
              v-model="credential.dedeuserid"
            ></v-text-field>
            <v-text-field
              label="SESSDATA"
              hint="Cookie中的SESSDATA"
              v-model="credential.sesdata"
            ></v-text-field>
            <v-text-field
              label="BILIJCT"
              hint="Cookie中的BILIJCT"
              v-model="credential.biliJct"
            ></v-text-field>
            <v-card-actions>
              <v-spacer/>
              <v-btn>登录</v-btn>
            </v-card-actions>
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
        <v-card-text>
          <v-icon left color="orange">mdi-alert</v-icon>
          确认删除任务？该操作不可逆
        </v-card-text>
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
    menu: false,
    code: -1,
    loading: false,
    snackbarMsg: '',
    snackbar: false,
    drawer: true,
    items: [
      {
        title: '哔哩哔哩',
        icon: 'fa-brands fa-bilibili'
      }
    ],
    mini: true,
    removeTaskDialogVisible: false,
    loginDialogVisible: false,
    removeTaskLoading: false,
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
  mounted () {
    // 获取用户信息
    this.getBilibiliUser()
  },
  methods: {
    ...mapMutations(['setUser', 'listUsers', 'setCols']),
    async getQrCode () {
      this.overdue = false
      await this.axios.get('bilibili/qrCode').then(res => {
        this.qrCode = res.data.qrCodeImg
        const qrCodeKey = res.data.qrCodeKey
        const login = () => {
          this.axios.get(`bilibili/login?qrCodeKey=${qrCodeKey}`).then(res => {
            if (res.data.code === 0) {
              this.loading = false
              this.$cookies.set('dedeuserid', res.data.dedeuserid, ONE_MONTH * 12, '/')
              this.$cookies.set('sessdata', res.data.sessdata, ONE_MONTH * 12, '/')
              this.$cookies.set('biliJct', res.data.biliJct, ONE_MONTH * 12, '/')
              this.getBilibiliUser()
              this.listUsers({
                page: 1,
                size: 36
              })
              this.loginDialogVisible = false
            } else if (res.data.code === 86038) {
              this.overdue = true
              this.loading = false
            } else if (res.data.code === 86090) {
              this.loading = true
              setTimeout(login, 1000)
            } else {
              setTimeout(login, 1000)
            }
          })
        }
        login()
      })
    },
    showLoginDialog () {
      this.loginDialogVisible = true
      this.getQrCode()
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
    removeTask () {
      this.removeTaskLoading = true
      this.axios.delete(`/configs/task?dedeuserid=${this.$cookies.get('dedeuserid')}`).then(res => {
        this.snackbarMsg = '😃 删除成功'
        this.user.biliTaskConfigId = null
        this.snackbar = true
        this.listUsers({
          page: 1,
          size: 36
        })
      }).finally(() => {
        this.removeTaskDialogVisible = false
        this.removeTaskLoading = false
      })
    },
    logOut () {
      this.credential.dedeuserid = null
      this.credential.sesdata = null
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
    ...mapState(['user']),
    avatarUrl: function () {
      return 'https://bilibili-cruii-io-1251547651.cos.ap-chengdu.myqcloud.com/avatars/' + this.$cookies.get('dedeuserid') + '.png'
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

</style>
