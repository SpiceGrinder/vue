<template>
  <v-app>
    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
      <v-tab v-for="(tab, index) in tabs" :key="index" ripple>{{ tab }} </v-tab>
      <v-tab-item :key="0">
        <div>
          <spice></spice>
        </div>
      </v-tab-item>

      <v-tab-item :key="1">
        <v-card flat>
          <v-card-text>
            hello
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item :key="2">
        <v-card flat>
          <v-card-text>
            dude
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import Spice from './components/Spice'
export default {
  name: 'app',
  components: {
    Spice,
  },
  data() {
    return {
      active: null,
      tabs: ['Grind', 'History', 'Configuration'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>

<style></style>
