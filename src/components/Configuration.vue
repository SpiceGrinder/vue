<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <span class="headline">Configuration</span>
          </v-flex>
          <v-flex xs12 @click="onClick">
            Container 1
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'configuration',
  methods: {
    onClick() {
      this.$emit('testFunc', 'dude')
    },
  },
}
</script>
