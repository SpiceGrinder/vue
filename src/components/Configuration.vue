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
              <v-btn color="secondary">
                Reset
              </v-btn>
              <v-btn color="primary">
                Save
              </v-btn>
            </v-layout>
          </v-flex>
          {{ spiceNames }}
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
      items: ['Salt', 'Pepper', 'Paprika', 'Cinnamon', 'Coffee'],
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
    },
  },
}
</script>
