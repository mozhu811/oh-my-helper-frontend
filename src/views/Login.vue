<template>
  <div class="pa-3">
    <v-row class="mh-100 h-100vh auth">
      <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication"
             style="background-color: #E9EDF6">
        <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
          <div class="position-relative">
            <div class="logo">
              <v-img contain max-width="200" src="/login-logo@4x.svg"></v-img>
            </div>
          </div>
        </div>
        <v-img contain src="/images/login-bg.svg" height="450" class="position-relative d-none d-lg-flex"></v-img>
      </v-col>
      <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center"
             style="background-color: #ffffff !important;">
        <div class="mt-xl-0 mt-5 mw-100">
          <h2 style="font-weight: 600" class="text-h3 mb-2">Welcome to Oh My Helper</h2>
          <div class="text-subtitle-1 mb-6"></div>
          <v-row v-if="$vuetify.breakpoint.smAndDown" class="d-flex mb-3">
            <v-col cols="6" sm="6" class="pr-2">
              <v-btn disabled right block class="third-party-login">
                QQ
                <v-icon style="margin-left: 5px">mdi-qqchat</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" sm="6" class="pl-2">
              <v-btn disabled right block class="third-party-login">
                GitHub
                <v-icon style="margin-left: 5px">mdi-github</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-else class="d-flex mb-3">
            <v-col cols="6" sm="6" class="pr-2">
              <v-btn disabled right block style="min-width: 240px">
                Sign in with
                <v-icon style="margin-left: 5px">mdi-qqchat</v-icon>
                (dev)
              </v-btn>
            </v-col>
            <v-col cols="6" sm="6" class="pl-2">
              <v-btn disabled right block style="min-width: 240px">
                Sign in with
                <v-icon style="margin-left: 5px">mdi-github</v-icon>
                (dev)
              </v-btn>
            </v-col>
          </v-row>
          <div class="d-flex align-center text-center mb-6">
            <v-divider></v-divider>
            <div class="pl-2 pr-2"> or sign in with</div>
            <v-divider></v-divider>
          </div>

          <v-card tile elevation="0">
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
                      <div class="overdue"><span class="text-sm-h6">刷新</span></div>
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
          </v-card>
          <h6 style="font-weight: 600" class="text-h6 text-sm-h6 text--primary d-flex pt-3">扫码后自动登录并配置默认参数
            <a class="v-btn pl-2" @click="toRoute('/')">先进去看看</a>
          </h6>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

const ONE_DAY = 60 * 60 * 24
export default {
  name: 'Login',
  data: () => ({
    userprofile: {
      fullName: 'John Doe',
      email: 'john.doe@doe.com'
    },
    menu: false,
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
    internalId: null,
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
    // 离开当前页面时销毁定时器
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.intervalId)
      this.intervalId = null
    })
    this.drawer = this.$vuetify.breakpoint.lgAndUp
    this.getQrCode()
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
    async getQrCode () {
      this.overdue = false
      const res = await this.axios.get('bilibili/qrCode')
      this.qrCode = res.data.qrCodeImg
      const qrCodeKey = res.data.qrCodeKey
      const login = async () => {
        const res = await this.axios.get(`bilibili/login?qrCodeKey=${qrCodeKey}`)
        if (res.data.code === 0) {
          this.loading = false
          this.$cookies.set('dedeuserid', res.data.dedeuserid, ONE_DAY * 7, '/')
          this.$cookies.set('sessdata', res.data.sessdata, ONE_DAY * 7, '/')
          this.$cookies.set('biliJct', res.data.biliJct, ONE_DAY * 7, '/')
          await this.getBilibiliUser()
          await this.$router.push('/')
          clearInterval(this.intervalId)
        } else if (res.data.code === 86038) {
          this.overdue = true
          this.loading = false
          clearInterval(this.intervalId)
        } else if (res.data.code === 86090) {
          this.loading = true
        }
      }
      this.intervalId = setInterval(login, 1000)
    },
    showLoginDialog () {
      this.loginDialogVisible = true
      this.getQrCode()
    },
    async getBilibiliUser () {
      this.credential.dedeuserid = this.$cookies.get('dedeuserid')
      this.credential.sesdata = this.$cookies.get('sessdata')
      if (this.credential.dedeuserid && this.credential.sesdata) {
        const res = await this.axios.get(`bilibili/user?dedeuserid=${this.credential.dedeuserid}&sessdata=${this.credential.sesdata}`)
        this.setUser(res.data)
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
    resetLoginDialog () {
      clearInterval(this.intervalId)
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

@media screen and (max-width: 600px) {
  .mw-100 {
    width: 100%;
    padding: 0 15px
  }
}

@media screen and (max-width: 1280px) {
  .mh-100 {
    height: 100% !important
  }
}

.h-100vh {
  height: 100vh !important;
}

.v-application .text-h3 {
  font-size: 1.5rem !important;
  line-height: 2rem;
  letter-spacing: normal !important;
  font-family: inherit !important;
  text-transform: none !important;
}
@media (min-width: 1536px){
  .auth .col-lg-7 {
    flex: 0 0 66.66%;
    max-width: 66.66%;
  }
}
@media (min-width: 1536px) {
  .auth .col-lg-5 {
    flex: 0 0 33.33%;
    max-width: 33.33%
  }
}

.v-application .text-h6 {
  font-size: 1rem !important;
  line-height: 1.2rem;
  letter-spacing: .0125em !important;
  font-family: inherit !important;
  text-transform: none !important;
}

.position-relative {
  position: relative !important;
}

.d-none {
  display: none !important;
}

@media screen and (min-width: 1530px) {
  .third-party-login {
    min-width: 240px
  }
}

.authentication:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: .3;
  left: 0;
  top: 0;
  bottom: 0;
  /*background: radial-gradient(rgb(210, 241, 223), rgb(211, 215, 250), rgb(186, 216, 244)) 0% 0%/400% 400%*/
}

.authentication .auth-header {
  position: absolute;
  top: 0;
  left: 0
}

@media screen and (max-width: 1280px) {
  .authentication .auth-header {
    position: unset
  }
}

@media screen and (max-width: 1024px) {
  .verticalLayout .logo {
    width: auto
  }
}

@media only screen and (min-width: 1170px) {
  .mini-sidebar .logo {
    width: 40px;
    overflow: hidden;
    padding-left: 0
  }
}
</style>
