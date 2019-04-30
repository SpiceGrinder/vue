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
                  {{ index + 1 }}.
                  <v-layout row wrap>
                    <v-flex xs2 v-for="spice in x.spices"
                      >{{ spice.name }} {{ spice.amount }}g</v-flex
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
}
</script>

<style scoped>
.padding-content {
  padding: 10px;
}
</style>
