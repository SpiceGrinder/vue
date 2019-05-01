import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons/iconfont/material-icons.css'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey.darken4,
    secondary: colors.blueGrey.lighten1,
    accent: colors.teal.darken1,
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app')
