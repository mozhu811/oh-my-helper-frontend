<template>
  <v-container>
    <v-btn
      v-show="!overlay"
      class="mx-2"
      fab
      dark
      color="primary"
      elevation="10"
      @click.stop="createContainerDialogVisible = true"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-btn
      v-show="!overlay"
      class="mx-2"
      fab
      dark
      color="warning"
      elevation="10"
      @click.stop="cookieDialogVisible = true"
    >
      <v-icon dark>
        mdi-square-edit-outline
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
      v-model="cookieDialogVisible"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">设置Cookie</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="inputCookieForm"
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
            <v-text-field
              v-model="dedeuserid"
              :rules="[rules.required]"
              label="DEDEUSERID"
              placeholder="请填入B站Cookie中DedeUserID的值"
              required
            ></v-text-field>

            <v-text-field
              v-model="biliJct"
              :rules="[rules.required]"
              label="BILIJCT"
              placeholder="请填入B站Cookie中bili_jct的值"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="cookieDialogVisible = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateCookies"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 创建容器配置对话框 -->
    <v-dialog
      v-model="createContainerDialogVisible"
      persistent
      max-width="650px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">创建容器</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="createContainerForm"
            v-model="valid"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="createContainerModel.containerName"
                    :rules="[rules.required, rules.containerName]"
                    label="容器名"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <v-select
                    :items="platforms"
                    v-model="createContainerModel.config.devicePlatform"
                    label="漫画签到平台"
                    hint="手机端漫画签到时的平台，建议选择你设备的平台"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="4">
                  <v-text-field
                    v-model="createContainerModel.config.sessdata"
                    :rules="[rules.required]"
                    label="SESSDATA"
                    placeholder="请填入B站Cookie中SESSDATA的值"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    v-model="dedeuserid"
                    :rules="[rules.required]"
                    label="DEDEUSERID"
                    placeholder="请填入B站Cookie中DedeUserID的值"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    v-model="biliJct"
                    :rules="[rules.required]"
                    label="BILIJCT"
                    placeholder="请填入B站Cookie中bili_jct的值"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    label="每日投币数量"
                    :rules="[rules.required]"
                    hint="每日投币数量,默认 5 ,为 0 时则不投币"
                    v-model="createContainerModel.config.numberOfCoins"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    label="保留硬币数量"
                    :rules="[rules.reserveCoins]"
                    hint="预留的硬币数，当小于这个值时，不会进行投币任务"
                    v-model="createContainerModel.config.reserveCoins"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4"
                >
                  <v-switch
                    true-value="1"
                    false-value="0"
                    v-model="createContainerModel.config.selectLike"
                    class="v-input--reverse">
                    <template #label>
                      投币时是否点赞
                    </template>
                  </v-switch>
                </v-col>

                <v-col
                  cols="6"
                  md="4"
                  sm="6">
                  <v-switch
                    v-model="createContainerModel.config.giveGift"
                    class="v-input--reverse">
                    <template #label>
                      过期礼物处理
                    </template>
                  </v-switch>
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="4"
                  v-show="createContainerModel.config.giveGift"
                >
                  <v-text-field
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则随机选取一个up主"
                    v-model="createContainerModel.config.upLive"
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4"
                >
                  <v-switch
                    v-model="createContainerModel.config.monthEndAutoCharge"
                    class="v-input--reverse">
                    <template #label>
                      B币券充电
                    </template>
                  </v-switch>
                </v-col>

                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                  v-show="createContainerModel.config.monthEndAutoCharge"
                >
                  <v-text-field
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则给自己充电"
                    v-model="createContainerModel.config.chargeForLove"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  sm="6"
                  md="5"
                  >
                  <v-select
                    :items="coinAddPriorities"
                    label="投币策略"
                    item-text='name'
                    item-value='id'
                    v-model="createContainerModel.config.coinAddPriority"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4">
                  <v-switch
                    v-model="needPush"
                    class="v-input--reverse">
                    <template #label>
                      是否推送通知
                    </template>
                  </v-switch>
                </v-col>

                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                  v-show="needPush"
                >
                  <v-select
                    :items="pushPriorities"
                    label="推送渠道"
                    item-text='name'
                    item-value='id'
                    v-model="pushPriority"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  v-if="needPush && pushPriority === 0">
                  <v-text-field
                    label="Server酱SendKey"
                    hint="Server酱SendKey"
                    v-model="createContainerModel.config.serverpushkey"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-if="needPush && pushPriority === 1">
                  <v-text-field
                    label="TelegramBotToken"
                    hint="Telegram机器人分配的token"
                    v-model="createContainerModel.config.telegrambottoken"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-if="needPush && pushPriority === 1">
                  <v-text-field
                    label="TelegramUserId"
                    hint="你自己Telegram的数字ID"
                    v-model="createContainerModel.config.telegramchatid"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="grey"
            @click="closeCreateContainerDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="createContainerLoading"
            :disabled="createContainerLoading"
            @click="createContainer"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      top
      app
      :timeout="2000"
    >
      {{ snackbarMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  created () {
    this.listContainers()
  },
  data () {
    return {
      createContainerLoading: false,
      snackbarMsg: '',
      snackbar: false,
      items: [],
      overlay: false,
      sessdata: '',
      dedeuserid: '',
      biliJct: '',
      valid: false,
      cookieDialogVisible: true,
      createContainerDialogVisible: false,
      rules: {
        required: value => value !== null || 'Required.',
        containerName: value => /^[^0-9][a-zA-Z0-9_]+$/.test(value) || '容器名为英文、数字组合且不能以数字开头',
        reserveCoins: value => (value <= 4000 && value >= 0) || '范围: [0, 4000]'
      },
      platforms: [
        'ios', 'android'
      ],
      coinAddPriorities: [
        { id: 0, name: '优先给热榜视频投币' },
        { id: 1, name: '优先给关注的UP主投币' }
      ],
      needPush: false,
      pushPriorities: [
        { id: 0, name: 'Server酱Turbo' },
        { id: 1, name: 'Telegram' }
      ],
      pushPriority: null,
      createContainerModel: {
        containerName: null,
        description: null,
        config: {
          sessdata: null,
          dedeuserid: null,
          biliJct: null,
          taskIntervalTime: 10,
          numberOfCoins: 5,
          reserveCoins: 50,
          selectLike: 0,
          monthEndAutoCharge: false,
          giveGift: false,
          upLive: 0,
          chargeForLove: 0,
          devicePlatform: 'ios',
          coinAddPriority: 0,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
          skipDailyTask: false,
          telegrambottoken: null,
          telegramchatid: null,
          serverpushkey: null
        }
      }
    }
  },
  methods: {
    listContainers () {
      this.overlay = true
      this.$http.get('containers').then(res => {
        this.items = res.data
      }).finally(() => {
        this.overlay = false
      })
    },
    updateCookies () {
      this.$http.put('containers/cookies',
        {
          dedeuserid: this.dedeuserid,
          sessdata: this.sessdata.replaceAll('%2C', ',').replaceAll('%2A', '*'),
          biliJct: this.biliJct
        }).then(res => {
        this.setCookies()
        this.snackbarMsg = '更新成功'
        this.snackbar = true
      }).finally(() => {
        this.cookieDialogVisible = false
        this.listContainers()
      })
    },
    setCookies () {
      const valid = this.$refs.inputCookieForm.validate()
      if (valid) {
        const d = new Date()
        d.setTime(d.getTime() + (9999 * 24 * 60 * 60 * 1000))
        const expires = 'expires=' + d.toGMTString()
        document.cookie = 'dedeUserId' + '=' + this.dedeuserid + '; ' + expires + ';domain=.cruii.io'
        document.cookie = 'sessData' + '=' + this.sessdata + '; ' + expires + ';domain=.cruii.io'
        document.cookie = 'biliJct' + '=' + this.biliJct + '; ' + expires + ';domain=.cruii.io'
        this.cookieDialogVisible = false
        this.listContainers()
      }
    },
    getCookie (cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return null
    },
    createContainer () {
      const valid = this.$refs.createContainerForm.validate()
      if (valid) {
        this.createContainerLoading = true
        this.createContainerModel.description = this.getCookie('dedeUserId')
        this.$http.post('containers', this.createContainerModel).then(res => {
          this.snackbarMsg = '创建成功'
          this.snackbar = true
          this.createContainerDialogVisible = false
          this.listContainers()
        }).finally(() => {
          this.createContainerLoading = false
        })
      }
    },
    closeCreateContainerDialog () {
      this.createContainerModel = this.$options.data().createContainerModel
      this.createContainerDialogVisible = false
    }
  }
}
</script>
