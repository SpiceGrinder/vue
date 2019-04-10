<template>
  <v-container grid-list-xl text-xs-center>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Select a Spice</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Select Amount</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items flat>
        <v-stepper-content step="1">
          <v-layout row wrap>
            <v-flex v-for="(spice, index) in spices" :key="index" xs4>
              <v-card
                class="card-style"
                height="100px"
                @click="toggleSpice(spice.id)"
                :color="spice.selected ? '#42A5F5' : undefined"
                ripple
              >
                <div class="spice-name">
                  {{ spice.name }}
                </div>
              </v-card>
            </v-flex>
          </v-layout>
          <v-btn color="primary" @click="e1 = 2">
            Next
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1">
            Grind
          </v-btn>

          <v-btn flat @click="e1 = 1">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: 'spice',
  data() {
    return {
      e1: 0,
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
          name: 'Peppers',
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
  },
}
</script>

<style scoped>
.card-style {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spice-title {
  font-size: 16px;
}
.spice-name {
  font-size: 14px;
}
</style>
