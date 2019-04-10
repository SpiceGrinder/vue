<template>
  <v-container grid-list-xl>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Select a Spice</v-stepper-step
        >

        <v-stepper-step :complete="e1 > 2" step="2"
          >Select Amount</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout row wrap>
            <v-flex xs12>
              <span> Select a Spice</span>
            </v-flex>
            <v-flex v-for="(spice, index) in spices" :key="index" xs4>
              <v-card
                class="card-style"
                height="100px"
                @click="toggleSpice(spice.id)"
                :color="spice.selected ? '#42A5F5' : undefined"
                flat
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
          <v-layout row wrap>
            <v-flex class="left-margin" xs3>
              <v-switch v-model="parts" :label="`Grind by parts`"></v-switch>
            </v-flex>
            <v-flex class="left-margin" xs3>
              <v-select
                v-model="selectedUnit"
                :items="items"
                label="Select Unit"
              ></v-select>
            </v-flex>
            <v-flex xs4></v-flex>
            <v-flex v-if="parts" xs2 class="middle">
              <div>
                Total Amount
              </div>
            </v-flex>
            <v-flex v-if="parts" xs10>
              <v-slider
                v-model="totalAmount"
                step=".1"
                max="20"
                thumb-label="always"
              ></v-slider>
            </v-flex>
          </v-layout>
          <div v-if="parts">
            <v-layout
              v-for="(spice, index) in spices.filter(spice => spice.selected)"
              :key="index + 'hi'"
            >
              <v-flex xs2 class="middle">
                <div class="spice-title">{{ spice.name }}</div>
              </v-flex>
              <v-flex xs10>
                <v-slider
                  v-model="spices[spice.id].value"
                  step=".1"
                  max="20"
                  thumb-label="always"
                ></v-slider>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="!parts">
            <v-layout
              v-for="(spice, index) in spices.filter(spice => spice.selected)"
              :key="index + 'hi'"
            >
              <v-flex xs2 class="middle">
                <div class="spice-title">{{ spice.name }}</div>
              </v-flex>
              <v-flex xs10>
                <v-slider
                  v-model="spices[spice.id].value"
                  step=".1"
                  max="20"
                  thumb-label="always"
                ></v-slider>
              </v-flex>
            </v-layout>
          </div>

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
      totalAmount: 0,
      selectedUnit: null,
      items: ['Grams', 'Ounces'],
      parts: false,
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
  border: 1px solid #aaaaaa;
}
.spice-title {
  font-size: 16px;
}
.spice-name {
  font-size: 14px;
}
.left-margin {
  margin-left: 14px;
}
.full-width {
  display: flex;
  width: 100%;
}
.middle {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
