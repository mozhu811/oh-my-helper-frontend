<template>
  <v-container>
    <v-btn
      v-show="!screenLoading"
      :disabled="!user"
      class="mx-2"
      fab
      :dark="user !== null"
      color="pink"
      elevation="10"
      @click.stop="createTaskDialogVisible = true"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <div class="mt-5">
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="(item, i) in users" :key="i">
          <card :item="item"></card>
        </v-col>
      </v-row>
    </div>

    <v-overlay
      color="#212121"
      light opacity="0.10" :value="screenLoading">
      <v-progress-circular
        indeterminate
        size="100"
        color="primary"
      >
        <i class="fa-brands fa-bilibili"/>
      </v-progress-circular>
    </v-overlay>

    <v-dialog
      v-model="createTaskDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      @close="resetTaskConfig"
      scrollable
    >
      <v-card tile>
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="createTaskDialogVisible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="createTask"
              :loading="createTaskLoading"
            >
              保存
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="createTaskForm"
            v-model="valid"
          >
            <v-container>
              <v-subheader>投币设置</v-subheader>
              <v-row>
                <v-col
                  cols="6"
                  md="4"
                >
                  <v-text-field
                    label="每日投币数量"
                    :rules="[rules.required,rules.isNumber,rules.donateCoinsRange]"
                    hint="每日投币数量,默认 5 ,为 0 时则不投币"
                    v-model="config.donateCoins"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  md="4"
                >
                  <v-text-field
                    label="保留硬币数量"
                    :rules="[rules.reserveCoins]"
                    hint="预留的硬币数，当小于这个值时，不会进行投币任务"
                    v-model="config.reserveCoins"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="6"
                  md="4"
                >
                  <v-select
                    :items="coinAddPriorities"
                    label="投币策略"
                    item-text='name'
                    item-value='id'
                    v-model="config.donateCoinStrategy"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-subheader>漫画签到设置</v-subheader>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-select
                    :items="platforms"
                    item-text="label"
                    item-value="value"
                    v-model="config.devicePlatform"
                    label="漫画签到平台"
                    hint="手机端漫画签到时的平台，建议选择你设备的平台"
                  ></v-select>
                </v-col>
              </v-row>
              <v-subheader>直播间过期礼物设置</v-subheader>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    label="礼物赠送对象UID"
                    :rules="[rules.required]"
                    hint="指定礼物赠送对象，为0时则为本项目作者。"
                    v-model="config.donateGiftTarget"
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-subheader>自动充电设置（限定年费大会员）</v-subheader>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    label="充电对象UID"
                    :rules="[rules.required]"
                    hint="指定充电对象。该值为0时则为本项目作者，用于维护网站的正常运行和服务器资源开销，感谢您对本项目的支持。"
                    v-model="config.autoChargeTarget"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-subheader>任务日志推送设置</v-subheader>
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="4"
                >
                  <v-select
                    :items="pushPriorities"
                    label="推送渠道"
                    item-text='name'
                    item-value='id'
                    hint="用于接收每日执行日志，强烈建议配置。便于通知您的数据过期。"
                    v-model="pushChannel"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-if="pushChannel === 0">
                  <v-text-field
                    label="Server酱SendKey"
                    hint="Server酱SendKey。详情请前往官网 https://sct.ftqq.com/"
                    :rules="[rules.required]"
                    v-model="config.scKey"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-if="pushChannel === 1">
                  <v-text-field
                    label="Telegram bot token"
                    hint="BotFather 分配的 Token"
                    :rules="[rules.required]"
                    v-model="config.tgBotToken"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  v-if="pushChannel === 1">
                  <v-text-field
                    label="Telegram user ID"
                    hint="Telegram 用户的数字 ID"
                    :rules="[rules.required]"
                    v-model="config.tgBotChatId"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  v-if="pushChannel === 2">
                  <v-text-field
                    label="企业微信 Corp ID"
                    hint="企业微信 Corp ID"
                    :rules="[rules.required]"
                    v-model="config.corpId"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushChannel === 2">
                  <v-text-field
                    label="企业微信 Corp Secret"
                    hint="企业微信 Corp Secret"
                    :rules="[rules.required]"
                    v-model="config.corpSecret"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushChannel === 2">
                  <v-text-field
                    label="企业微信 Agent ID"
                    hint="企业微信 Agent ID"
                    :rules="[rules.required]"
                    v-model="config.agentId"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushChannel === 2">
                  <v-text-field
                    label="企业微信 Media ID"
                    hint="素材管理中的图片Media ID。在【管理工具】-【图片】中找到您需要的图片，右键获取图片链接，即可在链接中看到 media_id 参数的值。"
                    :rules="[rules.required]"
                    v-model="config.mediaId"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  v-if="pushChannel === 3">
                  <v-text-field
                    label="Device key"
                    hint="Bark App 分配的 Device key。只填写 device_key 即可，不需要其他内容。"
                    :rules="[rules.required]"
                    v-model="config.barkDeviceKey"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-subheader>其他设置</v-subheader>
              <v-checkbox v-model="config.followDeveloper" label="关注开发者账号"></v-checkbox>
            </v-container>
          </v-form>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
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
  </v-container>
</template>

<script>
import Card from '@/components/Card'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Card
  },
  data () {
    return {
      createTaskLoading: false,
      snackbarMsg: '',
      snackbar: false,
      items: [],
      sessdata: null,
      dedeuserid: null,
      biliJct: null,
      overlay: false,
      valid: false,
      cookieDialogVisible: false,
      createTaskDialogVisible: false,
      rules: {
        required: value => value !== null || '必填',
        isNumber: value => /^\d+$/.test(value) || '必须为数字',
        donateCoinsRange: value => (value <= 5 && value >= 0) || '范围: [0, 5]',
        reserveCoins: value => (value <= 4000 && value >= 0) || '范围: [0, 4000]'
      },
      platforms: [
        {
          label: 'iOS',
          value: 'ios'
        },
        {
          label: '安卓',
          value: 'android'
        }
      ],
      coinAddPriorities: [
        {
          id: 0,
          name: '优先给热榜视频投币'
        },
        {
          id: 1,
          name: '优先给关注的UP主投币'
        }
      ],
      needPush: false,
      pushPriorities: [
        {
          id: -1,
          name: '无'
        },
        {
          id: 0,
          name: 'Server酱Turbo'
        },
        {
          id: 1,
          name: 'Telegram'
        },
        {
          id: 2,
          name: '企业微信（图文推送）'
        },
        {
          id: 3,
          name: 'Bark'
        }
      ],
      pushChannel: -1,
      config: {
        donateCoins: 5,
        reserveCoins: 50,
        autoCharge: false,
        donateGift: false,
        donateGiftTarget: 0,
        autoChargeTarget: 0,
        devicePlatform: 'ios',
        donateCoinStrategy: 0,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        skipTask: false,
        tgBotToken: null,
        tgBotChatId: null,
        scKey: null,
        corpId: null,
        corpSecret: null,
        agentId: null,
        mediaId: null,
        barkDeviceKey: null,
        biliPush: false,
        followDeveloper: false
      }

    }
  },
  mounted () {
    this.listUsers()
  },
  methods: {
    ...mapMutations(['listUsers']),
    createTask () {
      const valid = this.$refs.createTaskForm.validate()
      if (valid) {
        this.createTaskLoading = true
        this.$http.post('tasks', this.config).then(res => {
          this.snackbarMsg = '😃 创建成功'
          this.snackbar = true
          this.createTaskDialogVisible = false
          this.listUsers()
        }).finally(() => {
          this.createTaskLoading = false
        })
      }
    },
    resetTaskConfig () {
      this.config = this.$options.data().config
    }
  },
  watch: {
    createTaskDialogVisible: function (newVal, oldVal) {
      if (!newVal) {
        this.resetTaskConfig()
        this.$refs.createTaskForm.resetValidation()
      }
    },
    pushChannel: function (newVal, oldVal) {
      if (newVal === -1) {
        this.config.biliPush = true
      }
      this.$refs.createTaskForm.resetValidation()
    }
  },
  computed: {
    ...mapState(['user', 'users', 'screenLoading'])
  }
}
</script>
