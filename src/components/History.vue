<template>
  <v-container grid-list-sm>
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <span class="headline">History</span>
          </v-flex>
          <v-flex xs12 class="subheading">
            <v-layout
              v-for="(x, index) in history"
              class="padding-content"
              row
              wrap
            >
              <v-flex xs12>
                <v-layout row span>
                  <v-layout row wrap>
                    <span> {{ index + 1 }}. </span>
                    <span v-for="spice in x.spices" class="column"
                      >{{ spice.name }}
                      {{ spice.amount | decimalPoints }}g</span
                    >
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="margin-bottom">
                <v-divider> </v-divider>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'history',
  props: ['history'],
  methods: {
    async fetchHistory() {
      await this.$emit('fetchHistory')
    },
  },
  async created() {
    await this.fetchHistory()
  },
  filters: {
    decimalPoints: function(value) {
      if (value == null) {
        return
      }
      return value.toFixed(2)
    },
  },
}
</script>

<style scoped>
.padding-content {
  padding: 10px;
}
.column {
  padding-left: 16px;
}
</style>
