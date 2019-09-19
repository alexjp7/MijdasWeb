<template>
  <div>
    <v-btn class="grey--text" @click="drawer = !drawer"></v-btn>
    <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
      :src="image"
      app
      color="primary"
      dark
      floating
      mobile-break-point="991"
      persistent
      width="260"
    >
      <template v-slot:img="attrs">
        <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
      </template>

      <v-list-item two-line>
        <v-list-item-avatar color="white">
          <v-img src="@/assets/Markit_1.0.png" height="34" contain />
        </v-list-item-avatar>

        <v-list-item-title class="title">MarkIt</v-list-item-title>
      </v-list-item>

      <v-divider class="mx-3 mb-3" />
      <v-list nav>
        <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
        <div />

        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.text" />
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list nav>
          <v-list-item to="/" @click="logout()">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>

            <v-list-item-title class="font-weight-light">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    return: {
      drawer: false
    },
    links: [
      {
        to: "/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard"
      },
      {
        to: "/calendar",
        icon: "mdi-calendar-month-outline",
        text: "Calendar"
      },
      {
        to: "/announcements",
        icon: "mdi-message-alert-outline",
        text: "Announcements"
      },
      {
        to: "/jobboard",
        icon: "mdi-bulletin-board",
        text: "Job Board"
      },
      {
        to: "/profile",
        icon: "mdi-account",
        text: "Profile"
      },
      {
        to: "/settings",
        icon: "mdi-settings",
        text: "Settings"
      }
    ]
  }),
  methods: {
    logout() {
      //this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.v-avatar,
.v-responsive {
  cursor: pointer;
}
</style>