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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    icons: [
      'mdi-qqchat',
      'mdi-twitter',
      'mdi-sina-weibo',
      'mdi-github'
    ]
  })
}
</script>
