<template>
  <v-app>
    <v-tabs v-model="active" color="primary" dark slider-color="#80CBC4">
      <v-tab v-for="(tab, index) in tabs" :key="index" ripple>{{ tab }} </v-tab>
      <v-tab-item :key="0">
        <div>
          <spice></spice>
        </div>
      </v-tab-item>

      <v-tab-item :key="1">
        <history :history="history"> </history>
      </v-tab-item>

      <v-tab-item :key="2">
        <configuration @testFunc="testFunc"></configuration>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import Spice from './components/Spice'
import History from './components/History'
import Configuration from './components/Configuration'
export default {
  name: 'app',
  components: {
    Spice,
    History,
    Configuration,
  },
  data() {
    return {
      active: null,
      tabs: ['Grind', 'History', 'Configuration'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      history: [
        {
          spices: [
            { spice: 0, name: 'Salt', amount: 10 },
            { spice: 1, name: 'Pepper', amount: 100 },
          ],
        },
        {
          spices: [
            { spice: 0, name: 'Salt', amount: 8 },
            { spice: 1, name: 'Pepper', amount: 120 },
            { spice: 2, name: 'Coffee', amount: 23 },
          ],
        },
      ],
    }
  },
  methods: {
    testFunc(dude) {
      console.log(this.history, dude)
    },
  },
}
</script>

<style></style>
