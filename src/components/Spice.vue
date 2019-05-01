<template>
  <v-container grid-list-xl>
    <v-card>
      <v-card-text>
        <v-layout row wrap v-if="e1 == 0">
          <v-flex xs12>
            <span class="headline">Select Spice(s)</span>
          </v-flex>
          <v-flex v-for="(spice, index) in spices" :key="index" xs4>
            <v-card
              class="card-style"
              height="100px"
              @click="toggleSpice(spice.id)"
              :color="spice.selected ? 'accent' : undefined"
              flat
              ripple
            >
              <div class="title font-weight-regular">
                <span v-if="spiceNames[index]">
                  {{ spiceNames[index].name }}
                </span>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout justify-end>
          <v-btn color="primary" @click="e1 = 1" v-if="e1 == 0">
            Next
          </v-btn>
        </v-layout>

        <v-layout row wrap v-if="e1 == 1">
          <v-flex xs12>
            <span class="headline">Select Amount</span>
          </v-flex>
          <v-flex v-if="grindByPartsFeature" class="left-margin" xs4>
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
            <div class="middle subheading font-weight-regular">
              Total Amount
            </div>
          </v-flex>
          <v-flex v-if="parts" xs10>
            <v-slider
              v-model="totalAmount"
              step=".1"
              max="100"
              thumb-size="40"
              thumb-label="always"
            ></v-slider>
          </v-flex>
        </v-layout>
        <div v-if="parts && e1 == 1">
          <v-layout
            v-for="(spice, index) in spices.filter(spice => spice.selected)"
            :key="index + 'hi'"
          >
            <v-flex xs2 class="middle">
              <div class="subheading font-weight-regular">
                {{ spiceNames[index].name }}
              </div>
            </v-flex>
            <v-flex xs10>
              <v-slider
                v-model="spices[spice.id].value"
                step="1"
                max="100"
                thumb-size="40"
                thumb-label="always"
              ></v-slider>
            </v-flex>
          </v-layout>
        </div>

        <div v-if="!parts && e1 == 1">
          <v-layout
            v-for="(spice, index) in spices.filter(spice => spice.selected)"
            :key="index + 'hi'"
          >
            <v-flex xs2 class="middle">
              <div class="subheading font-weight-regular">
                {{ spiceNames[index].name }}
              </div>
            </v-flex>
            <v-flex xs10>
              <v-slider
                v-model="spices[spice.id].value"
                step=".1"
                max="20"
                thumb-size="40"
                thumb-label="always"
              ></v-slider>
            </v-flex>
          </v-layout>
        </div>

        <v-layout justify-end>
          <v-btn color="secondary" @click="e1 = 0" v-if="e1 == 1">Cancel</v-btn>
          <v-btn color="primary" @click="grindSpice" v-if="e1 == 1">
            Grind
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" bottom>
      Grinding Complete
      <v-btn color="green" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'spice',
  props: ['spiceNames'],
  data() {
    return {
      spices: [
        {
          id: 0,
          value: 0,
          selected: false,
        },
        {
          id: 1,
          value: 0,
          selected: false,
        },
        {
          id: 2,
          value: 0,
          selected: false,
        },
        {
          id: 3,
          value: 0,
          selected: false,
        },
        {
          id: 4,
          value: 0,
          selected: false,
        },
        {
          id: 5,
          value: 0,
          selected: false,
        },
      ],
      grindByPartsFeature: false,
      snackbar: false,
      timeout: 6000,
      totalAmount: 0,
      selectedUnit: 'Grams',
      items: ['Grams', 'Ounces'],
      parts: false,
      e1: 0,
    }
  },
  methods: {
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
    async fetchHistory() {
      await this.$emit('fetchHistory')
    },
    async grindSpice() {
      const param = this.spices
        .filter(spice => spice.selected)
        .map(spice => {
          let tot = spice.value
          if (this.selectedUnit == 'Ounces') {
            tot = tot * 28.34952
          }
          return {
            grinder: spice.id.toString(),
            amount: tot,
          }
        })

      const history = this.spices
        .filter(spice => spice.selected)
        .map((spice, index) => {
          let tot = spice.value
          if (this.selectedUnit == 'Ounces') {
            tot = tot * 28.34952
          }
          return {
            name: this.spiceNames[index].name,
            amount: tot,
          }
        })

      console.log(this.spices)

      try {
        // start the motors
        //await fetch('http://169.254.63.79:5000', {
        //  mode: 'cors',
        //  method: 'POST',
        //  body: JSON.stringify({
        //    spices: param,
        //  }),
        //})

        await fetch('http://localhost:3000/history', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ spices: history }),
        })

        this.fetchHistory()

        this.reset()
        this.e1 = 0
        this.snackbar = true
      } catch (err) {
        console.log(err)
      }
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
