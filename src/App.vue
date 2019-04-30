<template>
  <v-app>
    <v-tabs v-model="active" color="primary" dark slider-color="#80CBC4">
      <v-tab v-for="(tab, index) in tabs" :key="index" ripple>{{ tab }} </v-tab>
      <v-tab-item :key="0">
        <div>
          <spice
            @reset="reset"
            @toggleSpice="toggleSpice"
            @fetchHistory="fetchHistory"
            :spices="spices"
          ></spice>
        </div>
      </v-tab-item>

      <v-tab-item :key="1">
        <history :history="history" @fetchHistory="fetchHistory"> </history>
      </v-tab-item>

      <v-tab-item :key="2">
        <configuration
          :spices="spices"
          @changeSpice="changeSpice"
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
      spices: [
        {
          id: 0,
          name: 'Salt',
          value: 0,
          selected: false,
        },
        {
          id: 1,
          name: 'Pepper',
          value: 0,
          selected: false,
        },
        {
          id: 2,
          name: 'Paprika',
          value: 0,
          selected: false,
        },
        {
          id: 3,
          name: 'Cinnamon',
          value: 0,
          selected: false,
        },
        {
          id: 4,
          name: 'Pepper',
          value: 0,
          selected: false,
        },
        {
          id: 5,
          name: 'Salt',
          value: 0,
          selected: false,
        },
      ],
    }
  },
  methods: {
    changeSpice(id, value) {
      this.spices = this.spices.map(spice => {
        if (spice.id == id) {
          return {
            ...spice,
            name: value,
          }
        }
        return spice
      })
    },
    reset() {
      this.totalAmount = 0
      this.spices = this.spices.map(spice => {
        return {
          ...spice,
          value: 0,
          selected: false,
        }
      })
    },
    toggleSpice(id) {
      this.spices = this.spices.map(spice => {
        if (spice.id === id) {
          return {
            ...spice,
            selected: !spice.selected,
          }
        }

        return spice
      })
    },
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
      this.spices = data
    },
    async fetchHistory() {
      try {
        const response = await fetch('http://localhost:3000/history')
        const body = await response.json()
        this.history = body
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
