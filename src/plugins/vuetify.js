import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  data: () => ({
    // dark: this.$store.state.darkMode,
    // light: !this.dark
  }),
  icons: {
    iconfont: "mdiSvg" // 'mdi'  'mdiSvg'  'md'  'fa'  'fa4'
  },
  theme: {
    themes: {
      light: {
        primary: "#0069C0", // Dark Blue
        secondary: "#2196F3", // Blue
        accent: "#BFD4DF", // Light Grey
        background: "#E1E2E1", // White Background
        trim: "#61747E" // Dark Grey
      },
      dark: {
        primary: "#212121", // dark grey
        secondary: "#424242", // grey
        trim: "#000000", // black
        accent: "#37474F" // blue grey
      }
    }
  }
});
