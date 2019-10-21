<!--
--  Authors: Sam
-->

<template>
  <v-nav>
    <div v-if="$store.state.isUserLoggedIn">
      <!----------- Navigation Drawer - Side Bar ----------------->
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
        fixed
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

          <!--------------------------- The comment out below is messing around for accordian/dropdown for dashboard link to display like subjects or assessments etc --------------------------------->
          <!-- <v-list-group no-action sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(dashboard, i) in dashboards" :key="i" link>
              <v-list-item-title v-text="dashboard[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="dashboard[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>-->

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

    <!----------------------- Top Navigation ------------------------------------->
    <v-app-bar app fixed="true">
      <v-toolbar :flat="flat" color="white" floating="true">
        <div v-if="drawer==false">
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            depressed
            tile
            class="grey--text"
            @click="drawer = !drawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Home</v-btn>
        </router-link>
        <!-- <router-link to="/criteria">
          <v-btn text class="navText">Criteria Test</v-btn>
        </router-link>-->
        <router-link to="/login">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Register</v-btn>
        </router-link>
        <BreadcrumbItem>
          <a href="https://mijdas.com/" target="_blank">
            <v-btn text class="navText" style="text-align:right">About Us</v-btn>
          </a>
        </BreadcrumbItem>
      </v-toolbar>
    </v-app-bar>
  </v-nav>
</template>

<!--------------------------------------------------------------------------------------------------------------------------------------------
-- |
-- | We have two types of nav bars: `top nav && side nav.`
-- | We also need to decide on where we place what certain links, such as:
-- | Nav-bar: about, profile, calendar, settings etc
-- | Side-nav: subjects, assessments, criteria, tutors etc
-- |
--------------------------------------------------------------------------------------------------------------------------------------------->

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
      this.$store.dispatch("logout");
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
