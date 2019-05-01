<template>
  <v-app>
    <v-tabs v-model="active" color="primary" dark slider-color="#80CBC4">
      <v-tab v-for="(tab, index) in tabs" :key="index" ripple>{{ tab }} </v-tab>
      <v-tab-item :key="0">
        <div>
          <spice
            @fetchHistory="fetchHistory"
            :spiceNames.sync="spiceNames"
          ></spice>
        </div>
      </v-tab-item>

      <v-tab-item :key="1">
        <history :history.sync="history" @fetchHistory="fetchHistory">
        </history>
      </v-tab-item>

      <v-tab-item :key="2">
        <configuration
          :spices="spiceNames"
          @refetch="fetchSpices"
        ></configuration>
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
      history: [],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      spiceNames: [],
    }
  },
  methods: {
    async fetchSpices() {
      const response = await fetch('http://localhost:3000/spices')
      const body = await response.json()
      const data = body.map(item => {
        return {
          ...item,
          selected: false,
          value: 0,
        }
      })
      this.spiceNames = data
    },
    async fetchHistory() {
      try {
        const response = await fetch('http://localhost:3000/history')
        const body = await response.json()
        this.history = body.reverse()
      } catch (err) {
        console.log('could not fetch history')
      }
    },
  },
  async created() {
    try {
      await this.fetchSpices()
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style></style>
