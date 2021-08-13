<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-icon x-large>mdi-hubspot</v-icon>
      <v-toolbar-title class="font-weight-bold">Bilibili Helper Hub</v-toolbar-title>
      <v-spacer></v-spacer>

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
              <!--        <v-img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAC0ALQDAREAAhEBAxEB/8QAHAABAAMAAwEBAAAAAAAAAAAAAAUGBwECBAMJ/8QASBAAAQMCAgQHDQUHAgcAAAAAAQACAwQFBhEHEiExEyJBUWGR0RQVFjZVcXSBk5ShsdIyQlJUwVZicnOCkrMjQyQmM0VThLL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEAAgMAAwEBAAAAAAAAAAABAhESITEiMlFBQv/aAAwDAQACEQMRAD8A/RVetyEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQdBPAZTAJmGRozLA4awHmRHdFEBAQEHSKeGcF0EzJADkSxwOR5tiI7oogICAgICAgICAgICAgICDFrxT3rDd+fNNLIypEhljnB/6gJ39PSPUteuF3K0nCWLKbEdNwcmrFWxD/Uj5HfvN6Pks2OuOW1gRoQN20oM5xvjgzGSz2ab/T2tnnaftc7Wnm5zyqyOWWW+o76MLXco5pro8ujo5I+Da0/7rs946Bt29KUwl9aGo6iAgICAgICAgICAgIOHvZGwySPDWtGZcTkAEEPNjPDFO8xyXiEkHI6oLh1gFNM8o+fhzhXyuz2b+xDlEdfb5gfEFE6jrLowEbY5BG/WjdzjZ8E7S3Gs0jqJrXX8Pb6vjwSHg5mZgOyO/I8h5itOXjTLLpEs1XRNddqgUlS3ivbquLXdIyB2dCmnWZz+pDw5wr5XZ7N/YovKKnjPHja2N1ssczuAcMpZwCC8fhGe0DnVkYyy31Fdw1S2Oet4W/1zYKeLI6mq4mU82wbBzq1ma320yPGuEYY2xRXSNjGANa0RPAA5tyy68o7eHOFfK7PZv7EOUe633+y3V2pQXKGZ+WeoHZO6jtTSyyveiiAgICAgICAgIOHOaxpe9wa1ozJO4BBmdxuF2x9eHWq1yGKgiOZJ2N1R993PnyBXxytud1Es7R3he307X3S6TNPLI6VkbT5gR+qbXhJ6+Hgpo8Gzv+PfI+xN1OOP648FdHf7QN98j7E3Tjj+ngro7/aBvvkfYm6ccf08FtHf7QD3yPsTdXjj+uwwlo+O0X4e+R9ibqccf08EtH3l4e+R9ibpxx/TwS0fD/vw98j7E3Tjj+ngno98vj3yPsTdOOP65ZhHR/I4MZfQ5x3AVke34JunHH9dLvo2ZDB3bh2tlMsY12se4Eu/hcMsim1uH4kcC4rmuzH2q6O/42nGxx2GRo2HPpHKli45b6q3KNiAgICAgICAgr2Pa59BhmpMZIdOWwAjkDt/wBSM53URei2BjLPV1OqNaSo1S7lya0bPiVazh4k7Jbaa8R+EF2gZUz1JcYWyDWbDFmQ1rQdm7aTzlRZN91L957R5Ko/YN7Ea1DvPaPJVH7BvYhqHee0eSqP2DexDUO89o8lUfsG9iGod57R5Ko/YN7ENQ7z2jyVR+wb2Iah3ntHkqj9g3sQ1DvPaPJVH7BvYhqOr7JZpGlj7TRlrhkRwDexDUR1oidZr3NYonuNFJB3VTNcSeC42q5gPNmQR50SdXSk3SY2bSKZ4QGN7pjJA3ZPA1uvMq/xzvWTVFHYQEBAQEBAQEFT0m+LbfSWfJyRjPxxo0blhl5/FUSH4NVph4mcLZeD1Bl/4QpVx8SiNCAgICAgICAgipMvCmD0CT/IxGf8ATPccDLGpPOYD8AtRzy+zV1l2EBAQEBAQEBBU9Jvi230lnyckYz8ddGhPgzJnyVEn/wAtVqYeJnChzw5bzzwhStY+JVGnlr7rbbXHwlwrYYAd2u7InzDeUS2T1W6nSbh+GZscMdTOzPjPawAAdGZBKumecWuCeKphZUQPD45Gh7XDcQdyjXruiq/ijGFLhl8EL6d1RLNm4sa/V1W8+7n+SSbZyy4vhbdImHa4hk0slG88kzeL/cMx15JpJnKskE8FTGJqeZksbtzmODgfWEa9d0VESnLFdMOegl/yMRn/AEz7G5Jxs8czoAP7Wqzxzy+zWFHYQEBAQEBAQEFT0m+LbfSWfJyRjPxxo2GWGHnnnkPwCtMPEvhPxbt/8hqlXHxUMYY6u1NcZ7TbMqZkB1HSaub3Hoz3BWRjLK70pQbcLrVEgT1dRIdu97z+qrHdW2xaNK+r1Z7zL3LEdvBNyMh8/I34qbbmFvrSKOkgoaWKjpmlsULAxgJzyAUdJ0+qKgcT4QocStZJJK6CpiaWslaM8xzEcoSXTOWPJnl4wLf7SS8U3dUI/wByDjZedu8LW3O42I213q62OfhKCqkhOfGYdrXedp2IzLY1rCV8qMQWgV9VTCGQSGM6ueq/IDjDPk25epZrtjdx2m8bKX0Cb/IxD+s/xwAMakjlMB+AWo55fZq6y7CAgICAgICAgqek3xbb6Sz5OSMZ+ONHGzCzv50nyCtMPEvhPxbt38hqlXHxzcMLWG6Vnd9fQNlm1Q0kucAQN2YB2psuMvb30lDR0MfBUVLFAz8MbA0fBF1p9kV84KmnqWudTzslDHFjixwOThvBy5UQhqqapLxT1EcvBO1H6jgdV3MctxQ24gqqapMgp52SGJ5jk1XZ6rhvB6UH1RXir7JaLnn3fboJifvOZxusbUSyV6KWlpqKBlLSQMhiYMmsYMgEPEZN420voE3+RiJ/VBxz46ex+QWo55fZqyy7CAgICAgICAgqek3xbb6Sz5OSMZ+OdHLf+Vh+9NJ+itMPEthQauHLe3mhAUq4+JVGhAQVmfDN2oKueowvc4qSOrOtNBMzWYH/AIm78j0JtjjZ48lPgu82hp7xX/gnVEYbVGVmes/bxm8289qu042eVP2Cw01gozTQSPlfI4ySyvPGkeeVRqTSSRoQEERK3PFdM7P7NBL8ZGIz/VCx2MsZtPOIStRzy+zVFl2EBAQEBAQEBBVNJjScN5jkqGE9RVjGfjro0l4TDb4xvjqHt6wD+qUw8TGFXB2HqHnbHqnoIJBHWpVx8SqNCAgICAgICAgiHvDsWxRt2llveXdGcjcvkUZ/0oGNHGoxwImbS18EY8+Q7VqeOeX2assuwgICAgICAgIPBfrYLxaKq3HIOlZxCeRw2t+ICJZuaUXR7e4rPV1NhuZEBlkzYX7MpBsLT58h1K1zwuuquRttyt88stllpzDO4yPpp8w1rzvLHN3Z7yMiM1G9WeBmxXnsobXl6Q/6EPkcNiv8hbPeX/QnR8jhsWeT7X7y/wChOj5HDYs/IWv3l/0J0fJ2EuKeWitg/wDYf9CHZwuKPyds9u/6UOzhcU/krZ7w/wClDtxwuKvyVs94k+hDtwJcWO2dxWtmf3uHkdl6tUZofJxBFT4fpqq73mubJPLk6ect1RkPssYOYcg3klDzuqRhqCbFWMpb3JDq08MnDuzGwZbGN8+wdRV8Yx+V209R1EBAQEBAQEBAQVbFmBqe/PNdRSNp6zLJxI4knn5j0qysZY78VUWTSNbwKWnkrODZ9ngqkFvq2p0xrKORQ6TCcg+4+uoH1J0ayfCvGkG2U7quuq66KFmWbzUgjbu3FXovKPLbbljS7yPittxrp3xjWc1s+0Dn2lOknK+PZURaRqWCSpqJ7iyKJpe9xn2ADed6nS/KPFbrrjK7Tmmt1zrp5WtLy1s5zy59p6Qr0ktvj3S0+kiCJ8001xYyNpc5xqNgA3nep0uskbR33FdfUspKS71sk0hyY3hyMzzbSqm7UsaDSaNvCXH3kfUp0usnHcOkz8dy94H1J0ayfSDBmL79Mw3yrkiib96eXXcB0NB39Sbi8bfWhWez0VjomUNDHqsbtc4/ae7lJKjpJp7UUQEBAQEBAQEBAQEBBnOlC7l89PZYn8WMcNKB+I/ZHVmfWrHLO/xWcK3c2S+U9Y52URdwcv8AAdh6t/qVrON1WiaRLgKXDb4mP41W9sQy5R9o/AfFZjpnelDwLWdx4noyTk2YmE/1DIfHJarnjdVddJN67htLbZE/KWtOTst4jG/rOQ61I6Z3U0y6KWSCVk0Ty18bg5rhvBG4quTcMP3aO92inuLMg6RuUgH3XjY4day7y7m0giiAgICAgICAgICAgICAg6yyxwRPmlcGsjaXOJ5ABmSiMKu9wkutzqbjJnnPIXAczeQeoZBacLd3byIJi8Ygmu9rttDMSXUTHMcT97cGn+0BFt3EZSVDqSqhqmfahkbIPODmiJDFF6dfbzPXAnggeDhB5GDd17T60i27u0UiLxowvPAVs1mlfxKgcJFnyPA2j1j5KVvC96aUo6iAgICAgICAgICAgICAgrGkO6d78PSQMdlJWOEI/h3u+Ay9aRjO6jJFpyEBAQEBB6LdWy26vp6+E8eCRrx05HchLpu1NURVdPFVQu1o5mB7TzgjMLLv6+iKICAgICAgICAgICAgIMs0m3Luq9x0DHZso4wCP33bT8NVWOOd3VQVZEBAQEBAQato2ubq2xGjkOb6J+oP4DtH6j1KV1wvS2KNiAgICAgICAgICAgIOskjIo3SyHJrAXOPMAiMIuda+43Gprnk5zyuf5gTsHUtOF7eZAQEBAQEBBa9G9y7jv8A3I92UdYws/qG0fqPWpWsLqtXUdhAQEBAQEBAQEBAQEEViuV8GG7jJGcncA4Z+fZ+qRnLxiS04iAgICAgICD22SV8N4oZYzk5tRGQf6glJ63VZegQEBAQEBB//9k=">-->
              <!--        </v-img>-->
              <span class="primary--text">登录</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <div v-if="isLogin">
                <h3>Cruii</h3>
                <p class="text-caption mt-1">
                  123@123.com
                </p>
                <v-divider class="my-3"></v-divider>
              </div>
              <v-btn
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
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
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
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',

  data: () => ({
    userInfo: {
      username: null,
      avatar: null,
      email: null
    },
    loginDialogVisible: false,
    overdue: true,
    qrCode: null,
    icons: [
      'mdi-qqchat',
      'mdi-twitter',
      'mdi-sina-weibo',
      'mdi-github'
    ]
  }),
  methods: {
    getQrCode () {
      this.overdue = false
      axios.get('http://passport.bilibili.com/qrcode/getLoginUrl').then(res => {
        console.log(res.data)
      })
    },
    showLoginDialog () {
      this.loginDialogVisible = true
      this.getQrCode()
    }
  },
  computed: {
    isLogin () {
      return this.getCookie('isLogin') === 'true'
    }
  }
}
</script>
