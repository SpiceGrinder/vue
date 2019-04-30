<template>
  <v-container grid-list-sm>
    <v-card>
      <v-card-text>
        <v-layout row wrap v-if="finished">
          <v-flex xs12>
            <span class="headline">Configuration</span>
          </v-flex>
          <v-flex xs6 v-for="(spice, index) in spices">
            <v-select
              v-model="spiceNames[index]"
              :label="'Container ' + (index + 1)"
              :items="items"
            >
            </v-select>
          </v-flex>
          <v-flex xs12>
            <v-layout justify-end>
              <v-btn @click="onReset" color="secondary">
                Reset
              </v-btn>
              <v-btn @click="onSave" color="primary">
                Save
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'configuration',
  props: ['spices'],
  data: function() {
    return {
      finished: false,
      spiceNames: {},
      default: {},
      changed: false,
      items: [
        'Salt',
        'Pepper',
        'Paprika',
        'Cinnamon',
        'Coffee',
        'Garlic Cloves',
        'Basil',
        'Fennel Seed',
        'Nutmeg',
        'Black Peppercorns',
      ],
    }
  },
  created() {
    this.updateSpiceNames()
    this.finished = true
  },
  methods: {
    updateSpiceNames() {
      let obj = {}
      this.spices.forEach((spice, index) => {
        obj[index] = spice.name || ''
      })
      this.spiceNames = obj
      this.default = { ...obj }
    },
    refetch() {
      this.$emit('refetch')
    },
    async onSave() {
      this.default = { ...this.spiceNames }
      try {
        for (const [key, value] of Object.entries(this.spiceNames)) {
          const id = parseInt(key) + 1
          const spice = { id: id, name: value }
          console.log(JSON.stringify(spice))
          await fetch('http://localhost:3000/spices/' + id + '/', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: `{ "id": ${id}, "name": "${value}" }`,
          })
          this.refetch()
        }
      } catch (err) {
        console.log(err)
        console.log('error saving the info')
      }
    },
    onReset() {
      this.spiceNames = { ...this.default }
    },
  },
  watch: {
    spices(value) {
      this.updateSpiceNames()
    },
  },
}
</script>
