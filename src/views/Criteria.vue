<template>
  <v-card class="mx-auto" flat color="transparent">
    <v-header>This is Sam's criteria testing nightmare</v-header>

    <v-card>
      <v-subheader>Slider</v-subheader>
      <v-card-text>
        <v-slider
          v-model="sliderMarks"
          :tick-labels="ticksLabels"
          thumb-label
          always-dirty
          :min="0"
          :max="1"
          step="0.25"
          ticks="always"
          tick-size="6"
        ></v-slider>
      </v-card-text>
    </v-card>
    <br />

    <v-card>
      <v-subheader>Checkboxes using an array, try me!</v-subheader>
      <v-container fluid>
        <p>{{ selected }}</p>
        <v-checkbox v-model="selected" label="Comments" value="Comments"></v-checkbox>
        <v-checkbox v-model="selected" label="Code Clarity" value="Code Clarity"></v-checkbox>
      </v-container>
    </v-card>
    <br />

    <v-card>
      <v-subheader>Dropdown Selection</v-subheader>
      <v-overflow-btn
        class="my-2"
        :items="dropdown_font"
        label="Overflow Btn"
        target="#dropdown-example"
      ></v-overflow-btn>
    </v-card>
    <br />

    <v-card>
      <v-subheader>Comments</v-subheader>
      <v-col cols="12">
        <v-textarea label="About Me" v-model="about" value clearable filled />
      </v-col>
    </v-card>

    <br />
    <v-btn class="mx-2" fab dark color="primary">
      <v-icon dark @click="addCriteria">mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      selected: [], // Checkbox
      value: 0, //Checkbox
      dropdown_font: ["0", "0.25", "0.5", "0.75", "1"], // Dropdown array
      sliderMarks: 0, // Slider v-model
      ticksLabels: ["0", "0.25", "0.5", "0.75", "1"] // Slider
    };
  },
  computed: {},
  methods: {
    addCriteria() {}
  }
};
</script>

<style scoped>
</style>