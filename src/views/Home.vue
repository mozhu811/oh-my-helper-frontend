<template>
  <v-container>
    <v-btn
      v-show="!overlay"
      class="mx-2"
      fab
      dark
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
      >
        <i class="fa-brands fa-bilibili"/>
        Loading...
      </v-progress-circular>
    </v-overlay>

    <!-- 创建容器配置对话框 -->
    <v-dialog
      v-model="createTaskDialogVisible1"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">新建任务</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="createTaskForm"
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
                    v-model="createTaskModel.containerName"
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
                    v-model="createTaskModel.config.devicePlatform"
                    label="漫画签到平台"
                    hint="手机端漫画签到时的平台，建议选择你设备的平台"
                  ></v-select>
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
                    v-model="createTaskModel.config.numberOfCoins"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    label="保留硬币数量"
                    :rules="[rules.reserveCoins]"
                    hint="预留的硬币数，当小于这个值时，不会进行投币任务"
                    v-model="createTaskModel.config.reserveCoins"
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
                    v-model="createTaskModel.config.selectLike"
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
                    v-model="createTaskModel.config.giveGift"
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
                  v-show="createTaskModel.config.giveGift"
                >
                  <v-text-field
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则随机选取一个up主"
                    v-model="createTaskModel.config.upLive"
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
                    v-model="createTaskModel.config.monthEndAutoCharge"
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
                  v-show="createTaskModel.config.monthEndAutoCharge"
                >
                  <v-text-field
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则给自己充电"
                    v-model="createTaskModel.config.chargeForLove"
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
                    v-model="createTaskModel.config.coinAddPriority"
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
                    v-model="createTaskModel.config.serverpushkey"
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
                    v-model="createTaskModel.config.telegrambottoken"
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
                    v-model="createTaskModel.config.telegramchatid"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="4">
                  <v-text-field
                    label="电子邮箱"
                    :rules="[rules.required]"
                    hint="此邮箱用于Cookie失效通知"
                    v-model="createTaskModel.config.email"
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
            :loading="createTaskLoading"
            :disabled="createTaskLoading"
            @click="createTask"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="createTaskDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
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
              @click="createTaskDialogVisible = false"
            >
              SAVE
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="createTaskForm"
            v-model="valid"
            lazy-validation
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
                    :rules="[rules.required]"
                    hint="每日投币数量,默认 5 ,为 0 时则不投币"
                    v-model="createTaskModel.config.numberOfCoins"
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
                    v-model="createTaskModel.config.reserveCoins"
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
                    v-model="createTaskModel.config.coinAddPriority"
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
                    v-model="createTaskModel.config.devicePlatform"
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
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则为开发者"
                    v-model="createTaskModel.config.upLive"
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
                    label="UP主UID"
                    :rules="[rules.required]"
                    hint="指定UP主。为0时则为开发者"
                    v-model="createTaskModel.config.chargeForLove"
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
                    v-model="pushPriority"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  v-if="pushPriority === 0">
                  <v-text-field
                    label="Server酱SendKey"
                    hint="Server酱SendKey"
                    v-model="createTaskModel.config.serverpushkey"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  v-if="pushPriority === 1">
                  <v-text-field
                    label="Telegram bot token"
                    hint="Telegram bot token"
                    v-model="createTaskModel.config.telegrambottoken"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  v-if="pushPriority === 1">
                  <v-text-field
                    label="Telegram user ID"
                    hint="Telegram user ID"
                    v-model="createTaskModel.config.telegramchatid"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  v-if="pushPriority === 2">
                  <v-text-field
                    label="企业微信 Corp ID"
                    hint="企业微信 Corp ID"
                    v-model="createTaskModel.config.corpId"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushPriority === 2">
                  <v-text-field
                    label="企业微信 Corp Secret"
                    hint="企业微信 Corp Secret"
                    v-model="createTaskModel.config.corpSecret"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushPriority === 2">
                  <v-text-field
                    label="企业微信 Agent ID"
                    hint="企业微信 Agent ID"
                    v-model="createTaskModel.config.agentId"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  v-if="pushPriority === 2">
                  <v-text-field
                    label="企业微信 Media ID"
                    hint="素材管理中的图片Media ID"
                    v-model="createTaskModel.config.mediaId"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-subheader>其他设置</v-subheader>
              <v-checkbox label="关注开发者账号"></v-checkbox>
            </v-container>
          </v-form>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="primary"
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
        required: value => value !== null || '该字段必填',
        reserveCoins: value => (value <= 4000 && value >= 0) || '范围: [0, 4000]'
      },
      platforms: [
        'iOS', '安卓'
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
        // {
        //   id: 0,
        //   name: 'Server酱Turbo'
        // },
        // {
        //   id: 1,
        //   name: 'Telegram'
        // },
        {
          id: 2,
          name: '企业微信（图文推送）'
        }
      ],
      pushPriority: 2,
      createTaskModel: {
        config: {
          sessdata: null,
          dedeuserid: null,
          biliJct: null,
          donateCoins: 5,
          reserveCoins: 50,
          autoCharge: false,
          donateGift: false,
          donateGiftTarget: null,
          autoChargeTarget: null,
          devicePlatform: 'iOS',
          donateCoinStrategy: 0,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
          skipDailyTask: false,
          tgBotToken: null,
          tgBotChatId: null,
          scKey: null,
          corpId: null,
          corpSecret: null,
          agentId: null,
          mediaId: null
        }
      }
    }
  },
  methods: {
    listContainers () {
      this.overlay = true
      this.$http.get('bilibili/users').then(res => {
        this.items = res.data
      }).finally(() => {
        this.overlay = false
      })
    },
    setCookies () {
      const valid = this.$refs.inputCookieForm.validate()
      if (valid) {
        this.$cookies.set('dedeuserid', this.dedeuserid, 60 * 60 * 24 * 31 * 12)
        this.$cookies.set('sessdata', this.sessdata, 60 * 60 * 24 * 31 * 12)
        this.$cookies.set('biliJct', this.biliJct, 60 * 60 * 24 * 31 * 12)
        this.cookieDialogVisible = false
      }
    },
    createTask () {
      const valid = this.$refs.createTaskForm.validate()
      if (valid) {
        this.createTaskLoading = true
        this.createTaskModel.config.dedeuserid = this.$cookies.get('dedeuserid')
        this.createTaskModel.config.sessdata = this.$cookies.get('sessdata')
        this.createTaskModel.config.biliJct = this.$cookies.get('biliJct')
        this.createTaskModel.description = [this.createTaskModel.config.dedeuserid,
          this.createTaskModel.config.sessdata.replaceAll('%2C', ',').replaceAll('%2A', '*'),
          this.createTaskModel.config.biliJct].join(';')
        this.$http.post('containers', this.createTaskModel).then(res => {
          this.snackbarMsg = '创建成功'
          this.snackbar = true
          this.createTaskDialogVisible = false
          this.listContainers()
        }).finally(() => {
          this.createTaskLoading = false
        })
      }
    },
    closeCreateContainerDialog () {
      this.createTaskModel = this.$options.data().createTaskModel
      this.createTaskDialogVisible = false
    }
  }
}
</script>
