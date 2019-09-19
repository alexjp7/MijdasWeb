<template>
  <nav>
    <div v-if="$store.state.isUserLoggedIn">
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

    <v-toolbar :extended="extended" :flat="flat" color="white">
      <v-toolbar-title class="tertiary--text font-weight-light align-self-center">{{ title }}</v-toolbar-title>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        depressed
        tile
        class="grey--text"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Home</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Register</v-btn>
        </router-link>
        <a href src="https://mijdas.com/">
          <v-btn text class="navText" style="text-align:right">About Us</v-btn>
        </a>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data: () => ({
    extended: false,
    flat: true,
    drawer: true,
    extensionHeight: 48,
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

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
#title {
  font-family: "Montserrat";
  font-size: 22px;
}
</style>
