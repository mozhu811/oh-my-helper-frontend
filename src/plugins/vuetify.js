import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    fonts: {
      body: 'PingFangSC, sans-serif !important',
      heading: 'PingFangSC, sans-serif !important'
    },
    themes: {
      light: {
        primary: '#03A9F4',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        background: colors.lightBlue.lighten5 // Not automatically applied
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base // If not using lighten/darken, use base to return hex
      }
    }
  }
})
